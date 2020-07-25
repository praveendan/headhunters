import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from './shared/ColourSheet';
import {StorageValueKeys} from './shared/Strings';
import AsyncStorage from '@react-native-community/async-storage';

export default class Loading extends Component {
  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const isAuthorized = await AsyncStorage.getItem(
        StorageValueKeys.IS_AUTHORIZED,
      );
      const isAuthenticationSet = await AsyncStorage.getItem(
        StorageValueKeys.IS_AUTH_SET,
      );
      if (isAuthorized !== null && isAuthenticationSet !== null) {
        this.props.navigation.navigate('Login');
      } else if (isAuthorized !== null) {
        this.props.navigation.navigate('Setup');
      } else {
        this.props.navigation.navigate('Startup');
      }
    } catch (error) {
      this.props.navigation.navigate('Startup');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>LOADING</Text>
        <ActivityIndicator size="large" color={Colors.highlight} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light,
  },
});
