import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {Colors} from '../shared/ColourSheet';
import TopBar from '../shared/TopBar';
import AdminHome from './AdminHome';
import AdminMembersListView from './AdminMembersListView';
const Stack = createStackNavigator();

export default function AdminBase({route, navigation}) {
  auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user loggeded');
    } else {
      console.log('hukas');
      navigation.navigate('Login');
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AdminHome"
        screenOptions={{
          headerStyle: styles.header,
          headerLeft: null,
          headerTitle: (props) => <TopBar />,
        }}>
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen
          name="AdminMembersListView"
          component={AdminMembersListView}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: Colors.dark,
  },
});
