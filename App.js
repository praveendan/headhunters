import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';

import Startup from './src/components/Startup';
import Loading from './src/components/Loading';
//import SignUp from './SignUp';
import Setup from './src/components/Setup';
import Login from './src/components/Login';
//import MemberHome from './src/components/member/MemberHome';
//import MemberUpdatesList from './src/components/member/MemberUpdatesListView';
import MemberBase from './src/components/member/MemberBase';
import AdminBase from './src/components/supremeUser/AdminBase';
//import Main from './Main';
// const App: () => React$Node = () => {
//   return (
//   );
// };

const AppNavigator = createSwitchNavigator(
  {
    Startup,
    Loading,
    Setup,
    Login,
    MemberBase,
    AdminBase,
  },
  {
    initialRouteName: 'Loading',
  },
);

const AppContainer = createAppContainer(AppNavigator);

// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

async function checkPermission() {
  const enabled = await messaging().hasPermission();
  // If Premission granted proceed towards token fetch
  if (enabled) {
    getToken();
  } else {
    // If permission hasn’t been granted to our app, request user in requestPermission method.
    requestPermission();
  }
}

async function requestPermission() {
  try {
    await messaging().requestPermission();
    // User has authorised
    getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
}

async function getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  let messagingToken = await messaging().getToken();

  const user = auth().currentUser;
  let userId = '';

  if (user) {
    userId = user.email.split('@')[0];
  }

  if (!fcmToken) {
    // fcmToken = await messaging().getToken();
    if (messagingToken) {
      // user has a device token
      await AsyncStorage.setItem('fcmToken', messagingToken);
      database()
        .ref('/users')
        .child(userId)
        .update({
          fcm_token: messagingToken,
        })
        .then(() => {})
        .catch((error) => {})
        .finally(() => {});
    }
  } else if (messagingToken !== fcmToken) {
    if (messagingToken) {
      // user has a device token
      await AsyncStorage.setItem('fcmToken', messagingToken);
      database()
        .ref('/users')
        .child(userId)
        .update({
          fcm_token: messagingToken,
        })
        .then(() => {})
        .catch((error) => {})
        .finally(() => {});
    }
  }
}

const createTwoButtonAlert = (title, Message) =>
  Alert.alert(
    title,
    Message,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );

export default function App() {
  useEffect(() => {
    checkPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      createTwoButtonAlert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    return unsubscribe;
  }, []);

  //  requestUserPermission();
  return <AppContainer />;
}
