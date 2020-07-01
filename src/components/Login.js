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
import {Roles, AppData, LoginMessages} from './shared/Strings';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
export default class Login extends React.Component {
  state = {
    userKey: '',
    errorMessage: null,
    storedUserIdLabel: 'userId',
    storedUserId: null,
    loginButtonText: 'LOGIN',
    compareUser: null,
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        auth().signOut();
      }
    });
    this.checkUser();
  }

  checkUser = async () => {
    try {
      this.state.storedUserId = await AsyncStorage.getItem(
        this.state.storedUserIdLabel,
      );

      if (this.state.storedUserId === null) {
        this.props.navigation.navigate('Setup');
      } else {
        this.roleChecker();
      }
    } catch (error) {
      this.props.navigation.navigate('Setup');
    }
  };

  handleLogin = () => {
    this.setState({
      errorMessage: null,
    });
    if (this.state.userKey !== '' && this.state.userKey !== null) {
      this.setState({loginButtonText: LoginMessages.LOGGING_IN_BUTTON});
      auth()
        .signInWithEmailAndPassword(
          this.state.storedUserId + AppData.USER_SUFFIX,
          this.state.userKey,
        )
        .then(() => {
          if (this.state.compareUser.user_role === Roles.MEMBER) {
            this.props.navigation.navigate('MemberHome');
          } else if (this.state.compareUser.user_role === Roles.SUPREME_USER) {
            this.props.navigation.navigate('AdminHome');
          }
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            this.setState({
              errorMessage: 'Wrong Key',
            });
          } else {
            this.setState({
              errorMessage: LoginMessages.CRITICAL_ERROR,
            });
          }
          this.setState({loginButtonText: LoginMessages.LOG_IN_BUTTON});
        });
    } else {
      this.setState({
        errorMessage: LoginMessages.EMPTY_USER_KEY_ERROR,
      });
    }
  };

  roleChecker = () => {
    database()
      .ref('users/' + this.state.storedUserId)
      .once('value')
      .then((snapshot) => {
        this.state.compareUser = snapshot.val();
        if (snapshot.val() === null) {
          this.clearUserId();
        }
      });
  };

  clearUserId = async () => {
    try {
      await AsyncStorage.removeItem(this.state.storedUserIdLabel);
      this.props.navigation.navigate('Setup');
    } catch (exception) {
      this.setState({
        errorMessage: LoginMessages.RESTART_APP_MESSAGE,
      });
    }
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
          placeholder="User Key"
          onChangeText={(userKey) => this.setState({userKey})}
          value={this.state.userKey}
        />
        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
          <Text style={styles.loginButtonText}>
            {this.state.loginButtonText}
          </Text>
        </TouchableOpacity>
        {this.state.errorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
        <Text style={styles.footerText}>
          HEAD-HUNTERS INTERCOM v{AppData.VERSION}
        </Text>
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
  errorMessage: {
    fontSize: 15,
    color: Colors.highlight,
  },
  footerText: {
    color: Colors.light,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 5,
  },
});
