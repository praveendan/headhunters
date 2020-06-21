import React from 'react';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

//import Loading from './Loading';
//import SignUp from './SignUp';
import Login from './src/components/Login';
import MemberHome from './src/components/MemberHome';
import UpdatesList from './src/components/MemberUpdatesListView';

import AdminHome from './src/components/AdminHome';
import MembersList from './src/components/AdminMembersListView';
//import Main from './Main';

// const App: () => React$Node = () => {
//   return (

//   );
// };

export default createAppContainer(
  createSwitchNavigator(
    {
      // Loading,
      //  SignUp,
      Login,
      MemberHome,
      UpdatesList,
      AdminHome,
      MembersList,
      //  Main,
    },
    {
      // initialRouteName: 'Login',
      initialRouteName: 'MembersList',
    },
  ),
);

//export default App;
