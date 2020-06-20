import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TopBar from './TopBar';
import {Colors} from './ColourSheet';
import Icon from 'react-native-vector-icons/Foundation';
export default class AdminHome extends React.Component {
  state = {userKey: '', errorMessage: null};
  handleLogin = () => {
    //login
  };
  render() {
    return (
      <View style={styles.container}>
        <TopBar />
        <View style={styles.viewContainer}>
          <View style={styles.viewContainerItem}>
            <View style={styles.viewContainerItemMain}>
              <Text style={styles.viewContainerItemHeading}>MEMBERS</Text>
              <Text style={styles.viewContainerItemSubHeading}>
                ADD, REMOVE, EDIT MEMBERS
              </Text>
            </View>
          </View>
          <View style={styles.viewContainerItem}>
            <View style={styles.viewContainerItemMain}>
              <Text style={styles.viewContainerItemHeading}>NEWS</Text>
              <Text style={styles.viewContainerItemSubHeading}>
                ADD, EDIT NEWS
              </Text>
            </View>
          </View>
          <View style={styles.viewContainerItem}>
            <View style={styles.viewContainerItemMain}>
              <Text style={styles.viewContainerItemHeading}>EVENTS</Text>
              <Text style={styles.viewContainerItemSubHeading}>
                ADD, EDIT EVENTS
              </Text>
            </View>
          </View>
          <View
            style={{
              ...styles.viewContainerItem,
              ...styles.viewContainerItemLast,
            }}>
            <View
              style={{
                ...styles.viewContainerItemMain,
                ...styles.viewContainerItemMainLast,
              }}>
              <Text style={styles.viewContainerItemHeading}>NOTIFICATION</Text>
              <Text style={styles.viewContainerItemSubHeading}>
                SEND A NOTIFICATION TO ALL
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  viewContainer: {
    flex: 1,
  },
  viewContainerItem: {
    height: '20%',
    paddingTop: 2,
    paddingBottom: 2,
  },
  viewContainerItemLast: {
    height: '40%',
  },
  viewContainerItemMain: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.light,
  },
  viewContainerItemMainLast: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewContainerItemHeading: {
    fontSize: 45,
    fontWeight: 'bold',
    color: Colors.highlight,
  },
  viewContainerItemSubHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});
