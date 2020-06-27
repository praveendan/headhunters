import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors} from './shared/ColourSheet';
export default class Login extends React.Component {
  state = {userId: '', userKey: '', errorMessage: null};
  handleMagicWord = () => {
    //login
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage && (
          <Text style={Colors.highlight}>{this.state.errorMessage}</Text>
        )}
        <Text style={styles.welcomeText}>Enter the Magic word</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="User Key"
          onChangeText={(userKey) => this.setState({userKey})}
          value={this.state.userKey}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleMagicWord}>
          <Text style={styles.loginButtonText}>Enter.!</Text>
        </TouchableOpacity>
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
});
