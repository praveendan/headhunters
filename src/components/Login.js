import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Colors} from './shared/ColourSheet';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends React.Component {
  state = {userKey: '', errorMessage: null, storedUserId: 'userId'};

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem(this.state.storedUserId);

      if (storedUserId === null) {
        this.props.navigation.navigate('Setup');
      }
    } catch (error) {
      this.props.navigation.navigate('Setup');
    }
  };

  handleLogin = () => {
    //login
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../img/HH_logo.png')}
          style={styles.logoStyle}
        />
        {this.state.errorMessage && (
          <Text style={Colors.highlight}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="User Key"
          onChangeText={(userKey) => this.setState({userKey})}
          value={this.state.userKey}
        />
        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>HEAD-HUNTERS INTERCOM v1.1</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
  textInput: {
    height: 40,
    width: '70%',
    borderColor: Colors.inputBorder,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: Colors.inputBackground,
  },
  loginButton: {
    height: 40,
    width: '70%',
    borderRadius: 5,
    marginTop: 8,
    padding: 3,
    alignItems: 'center',
    backgroundColor: Colors.highlight,
  },
  loginButtonText: {
    fontSize: 25,
    color: Colors.light,
    fontWeight: 'bold',
  },
  logoStyle: {
    width: '70%',
    height: '50%',
    resizeMode: 'contain',
  },
  footerText: {
    color: Colors.light,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 5,
  },
});
