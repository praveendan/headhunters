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
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends React.Component {
  state = {
    userId: '',
    userKey: '',
    compareUser: {},
    errorMessage: null,
    setupButtonText: 'SETUP',
  };

  handleLogin = () => {
    if (this.state.userId !== '') {
      database()
        .ref('users/' + this.state.userId)
        .once('value')
        .then((snapshot) => {
          this.state.compareUser = snapshot.val();
          if (this.state.compareUser === null) {
            this.setState({
              errorMessage: 'Wrong User Id. please contact Administrator',
            });
          } else {
            if (this.state.compareUser.user_key === this.state.userKey) {
              this.setUserId(this.state.userId);
              this.props.navigation.navigate('Login');
            } else {
              this.setState({
                errorMessage: 'Invalid User Key. please contact Administrator',
              });
            }
          }
        });
    } else {
      this.setState({
        errorMessage: 'User Id cannot be empty',
      });
    }
  };

  setUserId = async (userId) => {
    await AsyncStorage.setItem('userId', userId);
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../img/HH_logo.png')}
          style={styles.logoStyle}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="User Id"
          onChangeText={(userId) => this.setState({userId})}
          value={this.state.userId}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="User Key"
          onChangeText={(userKey) => this.setState({userKey})}
          value={this.state.userKey}
        />
        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
          <Text style={styles.loginButtonText}>
            {this.state.setupButtonText}
          </Text>
        </TouchableOpacity>
        {this.state.errorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
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
  errorMessage: {
    fontSize: 15,
    color: Colors.highlight,
  },
});
