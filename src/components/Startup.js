import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors} from './shared/ColourSheet';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends React.Component {
  state = {magicWord: '', errorMessage: null, compareKey: ''};

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    database()
      .ref('globals/magic_word')
      .once('value')
      .then((snapshot) => {
        this.state.compareKey = snapshot.val();
      });
  };

  handleMagicWord = async () => {
    if (this.state.compareKey === this.state.magicWord) {
      try {
        await AsyncStorage.setItem('isAuthorized', 'true');
        this.props.navigation.navigate('Setup');
      } catch (error) {
        this.setState({
          errorMessage: 'Error validating Magic word. Please try again later',
        });
      }
    } else {
      this.setState({errorMessage: 'Wrong Magic word.!'});
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Enter the Magic word</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="User Key"
          onChangeText={(magicWord) => this.setState({magicWord})}
          value={this.state.magicWord}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleMagicWord}>
          <Text style={styles.loginButtonText}>Enter.!</Text>
        </TouchableOpacity>
        {this.state.errorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light,
  },
  welcomeText: {
    fontSize: 20,
  },
  textInput: {
    height: 40,
    width: '70%',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: Colors.gray,
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
  errorMessage: {
    fontSize: 15,
    color: Colors.highlight,
  },
});
