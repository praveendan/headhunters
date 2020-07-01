import React from 'react';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import Startup from './src/components/Startup';
import Loading from './src/components/Loading';
//import SignUp from './SignUp';
import Setup from './src/components/Setup';
import Login from './src/components/Login';
import MemberHome from './src/components/member/MemberHome';
import MemberUpdatesList from './src/components/member/MemberUpdatesListView';

import AdminHome from './src/components/supremeUser/AdminHome';
import MembersList from './src/components/supremeUser/AdminMembersListView';
//import Main from './Main';

// const App: () => React$Node = () => {
//   return (

//   );
// };

export default createAppContainer(
  createSwitchNavigator(
    {
      Startup,
      Loading,
      //  SignUp,
      Setup,
      Login,
      MemberHome,
      MemberUpdatesList,
      AdminHome,
      MembersList,
      //  Main,
    },
    {
      initialRouteName: 'Loading',
      //initialRouteName: 'UpdatesList',
    },
  ),
);

//export default App;
