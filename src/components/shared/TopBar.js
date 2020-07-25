import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import OptionsMenu from 'react-native-options-menu';
import Icon from 'react-native-vector-icons/Foundation';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import {Colors} from './ColourSheet';
import {StorageValueKeys} from './Strings';

export default function TopBar({route, navigation}) {
  const myIcon = <Icon name="list" size={30} color={Colors.light} />;

  var logout = () => {
    auth().signOut();
  };

  var resetApplication = async () => {
    try {
      await AsyncStorage.removeItem(StorageValueKeys.USER_ID);
      await AsyncStorage.removeItem(StorageValueKeys.IS_AUTHORIZED);
      await AsyncStorage.removeItem(StorageValueKeys.IS_AUTH_SET);
      auth().signOut();
    } catch (exception) {}
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoStyle}
        source={require('../../img/HH_logo.png')}
      />
      <OptionsMenu
        customButton={myIcon}
        destructiveIndex={0}
        options={['Logout', 'Logout and reset App']}
        actions={[logout, resetApplication]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 100,
    flexDirection: 'row', // row
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
  },
  logoStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
