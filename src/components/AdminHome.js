import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import TopBar from './TopBar';
import {Colors} from './ColourSheet';
import Icon from 'react-native-vector-icons/Foundation';
import CommonStyles from './Common.style';
import ModalStyles from './Modal.style';
export default class AdminHome extends React.Component {
  state = {userKey: '', errorMessage: null, notificationModalVisible: false};
  handleLogin = () => {
    //login
  };

  setNotificationModalVisible = (visible) => {
    this.setState({notificationModalVisible: visible});
  };
  render() {
    const {notificationModalVisible} = this.state;
    return (
      <View style={CommonStyles.container}>
        <TopBar />
        <View style={CommonStyles.viewContainer}>
          <TouchableOpacity style={styles.viewContainerItem}>
            <View style={styles.viewContainerItemMain}>
              <Text style={styles.viewContainerItemHeading}>MEMBERS</Text>
              <Text style={styles.viewContainerItemSubHeading}>
                ADD, REMOVE, EDIT MEMBERS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewContainerItem}>
            <View style={styles.viewContainerItemMain}>
              <Text style={styles.viewContainerItemHeading}>NEWS</Text>
              <Text style={styles.viewContainerItemSubHeading}>
                ADD, EDIT NEWS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewContainerItem}>
            <View style={styles.viewContainerItemMain}>
              <Text style={styles.viewContainerItemHeading}>EVENTS</Text>
              <Text style={styles.viewContainerItemSubHeading}>
                ADD, EDIT EVENTS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.viewContainerItem,
              ...styles.viewContainerItemLast,
            }}
            onPress={() => {
              this.setNotificationModalVisible(true);
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
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={notificationModalVisible}
          onRequestClose={() => {}}>
          <View style={ModalStyles.centeredView}>
            <View style={ModalStyles.modalView}>
              <TextInput
                multiline
                style={styles.modalTextInput}
                placeholder="Enter your message"
              />

              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButton,
                  ...ModalStyles.closeButton,
                  backgroundColor: Colors.highlight,
                }}
                onPress={() => {
                  this.setNotificationModalVisible(!notificationModalVisible);
                }}>
                <Text style={ModalStyles.textStyle}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButton,
                  ...ModalStyles.openButton,
                  backgroundColor: Colors.dark,
                }}
                onPress={() => {}}>
                <Text style={ModalStyles.textStyle}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  modalTextInput: {
    width: '100%',
    height: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});
