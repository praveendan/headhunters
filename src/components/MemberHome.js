/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import TopBar from './TopBar';

export default class MemberHome extends React.Component {
  state = {userKey: '', errorMessage: null};
  handleLogin = () => {
    //login
  };
  render() {
    return (
      <View style={styles.container}>
          <TopBar/>
          <View style={styles.viewContainer}>
            <View style={styles.viewContainerItem}>
                <View style={styles.viewContainerItemMain}>
                  <Text style={styles.viewContainerItemHeading}>EVENTS</Text>
                  <Text style={styles.viewContainerItemSubHeading}>UPCOMING EVENTS</Text>
                </View>
                <Text style={styles.viewContainerItemViewMoreItems}>VIEW ALL EVENTS</Text>
                <Text style={styles.viewContainerItemViewMoreItemsArrow}>=></Text>
            </View>
            <View style={styles.viewContainerItem}>
                <View style={styles.viewContainerItemMain}>
                  <Text style={styles.viewContainerItemHeading}>NEWS</Text>
                  <Text style={styles.viewContainerItemSubHeading}>INTERCOM NEWS AND UPDATES</Text>
                </View>
                <Text style={styles.viewContainerItemViewMoreItems}>VIEW NEWS UPDATES</Text>
                <Text style={styles.viewContainerItemViewMoreItemsArrow}>=></Text>
            </View>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
      },
      viewContainer: {
        flex: 1,
        backgroundColor: '#ff0000',
      },
      viewContainerItem: {
        height: '50%',
        paddingLeft: 20,
        paddingRight:20,
        paddingTop: 20,
        backgroundColor: '#ffffff',
      },
      viewContainerItemMain: {
        flex: 1,
      },
      viewContainerItemHeading: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#cc0001',
      },
      viewContainerItemSubHeading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#0a0a0a',
      },
      viewContainerItemViewMoreItems: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        marginLeft: -20,
        marginRight: -20,
        textAlign: 'right',
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
      },
      viewContainerItemViewMoreItemsArrow: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#cc0001',
        color: '#ffffff',
        marginLeft: -20,
        marginRight: -20,
        textAlign: 'right',
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
      },
});
