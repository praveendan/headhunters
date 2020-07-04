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
import {
  Roles,
  AppData,
  LoginMessages,
  StorageValueKeys,
} from './shared/Strings';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends React.Component {
  state = {
    userId: '',
    userKey: '',
    compareUser: {},
    errorMessage: null,
    setupButtonText: LoginMessages.SETUP_BUTTON,
    isButtonDisabled: false,
  };

  handleLogin = () => {
    this.setState({
      errorMessage: null,
      setupButtonText: LoginMessages.SETTING_UP_BUTTON,
      isButtonDisabled: true,
    });
    if (this.state.userId !== '') {
      database()
        .ref('users/' + this.state.userId)
        .once('value')
        .then((snapshot) => {
          this.state.compareUser = snapshot.val();
          if (this.state.compareUser === null) {
            this.setState({
              errorMessage: LoginMessages.WRONG_USER_ID,
              setupButtonText: LoginMessages.SETUP_BUTTON,
              isButtonDisabled: false,
            });
          } else {
            if (this.state.compareUser.user_key === this.state.userKey) {
              this.setUserId(this.state.userId);
              //just log in
              this.loginUser();
            } else {
              this.setState({
                errorMessage: LoginMessages.INVALID_USER_KEY,
                setupButtonText: LoginMessages.SETUP_BUTTON,
                isButtonDisabled: false,
              });
            }
          }
        });
    } else {
      this.setState({
        errorMessage: LoginMessages.EMPTY_USER_ID,
        setupButtonText: LoginMessages.SETUP_BUTTON,
        isButtonDisabled: false,
      });
    }
  };

  loginUser = () => {
    auth()
      .signInWithEmailAndPassword(
        this.state.userId + AppData.USER_SUFFIX,
        this.state.userKey,
      )
      .then(() => {
        console.log(this.state.compareUser.user_role);
        if (this.state.compareUser.user_role === Roles.MEMBER) {
          this.props.navigation.navigate('MemberBase');
        } else if (this.state.compareUser.user_role === Roles.SUPREME_USER) {
          this.props.navigation.navigate('AdminHome');
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.error(error.code);
        this.setState({
          errorMessage: LoginMessages.LOGIN_ERROR,
          setupButtonText: LoginMessages.SETUP_BUTTON,
          isButtonDisabled: false,
        });
      });
  };

  setUserId = async (userId) => {
    try {
      await AsyncStorage.setItem(StorageValueKeys.USER_ID, userId);
    } catch (error) {
      this.setState({
        errorMessage: LoginMessages.SETUP_ERROR,
      });
    }
  };

  renderLoginButton = () => {
    return (
      <TouchableOpacity
        style={styles.loginButton}
        onPress={this.handleLogin}
        disabled={this.state.isButtonDisabled === true ? true : false}>
        <Text style={styles.loginButtonText}>{this.state.setupButtonText}</Text>
      </TouchableOpacity>
    );
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
        {this.renderLoginButton()}
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
