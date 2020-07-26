const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotificationMessage = functions.https.onCall((data, context) => {
    
    let tokenArray = [];

    admin.database().ref("users/").orderByChild("region").equalTo(data.region)
        .once("value", (snapshot) => {
            if(snapshot !== null) {
                snapshot.forEach((child) => {
                    if (tokenArray.indexOf(child.fcm_token) === -1) {
                        functions.logger.log("Hello from fcm_token.", child);
                        tokenArray.push(child.val().fcm_token);
                    }
                });

                if(0 < tokenArray.length) {
                    const message = {
                        notification: {
                            title: "New Notice",
                            body: data.text
                        },
                        data: {
                            sender: data.sender
                        }
                    };
                    admin.messaging().sendToDevice(tokenArray, message);
                } 
            }
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
            throw new functions.https.HttpsError('aborted', 'failed to read the database');
        }
    );
});

exports.deleteUser = functions.https.onCall((data, context) => {
    var deleteDbEntry = function(){
        admin.database().ref('users/' + data.user_id).remove()
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully deleted user :', data.user_id);
            return null;   
        })
        .catch((error) => {
            console.log(error.code);
            throw new functions.https.HttpsError('aborted', 'failed to read the database');
        });  
    }

    admin.auth().deleteUser(data.user_id)
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        return deleteDbEntry();
    })
    .catch((error) => {
        //re-add the user to delete
        console.log('Error fetching user data:', error);
        throw new functions.https.HttpsError('aborted', 'failed to read the database');
    });
});

exports.addUser = functions.https.onCall((data, context) => {
    var addDbEntry = function(){ 
        admin.database().ref('/users').child(data.user_id)
            .set({
                region: data.region,
                user_id: data.user_id,
                user_key: data.user_key,
                user_name: data.user_name,
                user_role: data.user_role,
            })
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully created new user entry:', data.user_id);
                return null;   
            })
            .catch((error) => {
                console.log(error.code);
                admin.database().ref('users/' + data.user_id).remove();
                throw new functions.https.HttpsError('aborted', 'failed to read the database');
            });
    }

    admin.auth().createUser({
        uid: data.user_id,
        email: data.user_email,
        password: data.user_key,
        displayName: data.user_name,
    })
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        return addDbEntry();    
    })
    .catch((error) => {
        console.log(error.code);
        throw new functions.https.HttpsError('aborted', 'failed create user');
    });
});

