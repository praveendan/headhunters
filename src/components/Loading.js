import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from './shared/ColourSheet';
import AsyncStorage from '@react-native-community/async-storage';

export default class Loading extends Component {
  state = {storeKey: 'userId', isAuthorized: 'isAuthorized'};
  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const isAuthorized = await AsyncStorage.getItem(this.state.isAuthorized);
      if (isAuthorized !== null) {
      } else {
        this.props.navigation.navigate('Startup');
      }
      //     const value = await AsyncStorage.getItem(this.state.storeKey);
      //     if (value !== null) {
      //       this.props.navigation.navigate('Login');
      //     } else {
      //       this.props.navigation.navigate('Setup');
      //     }
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
