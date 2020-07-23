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
import MemberHome from './MemberHome';
import MemberUpdatesList from './MemberUpdatesListView';
const Stack = createStackNavigator();

export default function MemberBase({route, navigation}) {
  auth().onAuthStateChanged((user) => {
    if (user) {
    } else {
      navigation.navigate('Login');
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MemberHome"
        screenOptions={{
          headerStyle: styles.header,
          headerLeft: null,
          headerTitle: (props) => <TopBar />,
        }}>
        <Stack.Screen name="MemberHome" component={MemberHome} />
        <Stack.Screen
          name="MemberUpdatesList"
          component={MemberUpdatesList}
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
