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
            throw new functions.https.HttpsError('send-error', 'failed to read the database');
        }
    );
});

exports.deleteUser = functions.https.onCall((data, context) => {
    var deleteDbEntry = function(){
        admin.database().ref('users/' + data.userId).remove();   
    }

    admin.auth().getUserByEmail(data.userEmail)
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord);
        if(userRecord.uid !== null){
            admin.auth().deleteUser(userRecord.uid);
            deleteDbEntry();
        }
        return;
    })
    .catch((error) => {
        //re-add the user to delete
        console.log('Error fetching user data:', error);
        throw new functions.https.HttpsError('send-error', 'failed to read the database');
    });
});


});
  