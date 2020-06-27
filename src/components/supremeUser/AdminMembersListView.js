import React, {Component, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  TextInput,
  Picker,
} from 'react-native';
import TopBar from '../shared/TopBar';
import {Colors} from '../shared/ColourSheet';
import ModalStyles from '../shared/Modal.style';

class UpdatesList extends Component {
  state = {
    names: [
      {
        id: 0,
        name: 'Ben',
        key: 'xxxxxxxxxxxxxx',
        role: 'member',
      },
      {
        id: 1,
        name: 'Susan',
        key: 'xxxxxxxxxxxxxx',
        role: 'member',
      },
      {
        id: 2,
        name: 'Robert',
        key: 'xxxxxxxxxxxxxx',
        role: 'member',
      },
      {
        id: 3,
        name: 'Mary',
        key: 'xxxxxxxxxxxxxx',
        role: 'member',
      },
      {
        id: 4,
        name: 'Mary',
        key: 'xxxxxxxxxxxxxx',
        role: 'member',
      },
      {
        id: 5,
        name: 'Loren',
        key: 'xxxxxxxxxxxxxx',
        role: 'member',
      },
      {
        id: 6,
        name: 'Json',
        key: 'xxxxxxxxxxxxxx',
        role: 'member',
      },
      {
        id: 7,
        name: 'Anaz',
        key: 'Lxxxxxxxxxxxxxxt',
        role: 'member',
      },
    ],
    roles: [
      {
        key: 'member',
        displayName: 'Member',
      },
    ],
    modalVisible: false,
    modalData: 'dummy',
  };

  showModal = (item) => {
    this.setState({modalData: item});
    this.setModalVisible(true);
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  createTwoButtonAlert = (username) =>
    Alert.alert(
      'Confirmation',
      'Are you sure that you want to  remove ' + username + '?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

  render() {
    const {modalVisible, modalData} = this.state;
    return (
      <View style={styles.container}>
        <TopBar />
        <ScrollView>
          {this.state.names.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemContainer}
              onPress={() => {
                this.showModal(item);
              }}>
              <Text style={styles.itemTitle}>User name: {item.name}</Text>
              <Text style={styles.itemExcerpt}>Role: {item.role}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <View style={ModalStyles.centeredView}>
            <View style={ModalStyles.modalView}>
              <Text style={ModalStyles.modalHeading}>Edit Member</Text>
              <View style={ModalStyles.formInline}>
                <Text style={ModalStyles.modalTitle}>Name</Text>
                <TextInput
                  style={ModalStyles.modalTextInput}
                  value={modalData.name}
                />
              </View>
              <View style={ModalStyles.formInline}>
                <Text style={ModalStyles.modalTitle}>Key</Text>
                <TextInput
                  style={ModalStyles.modalTextInput}
                  value={modalData.key}
                />
              </View>
              <View style={ModalStyles.formInline}>
                <Text style={styles.modalTitle}>Type</Text>
                <Picker
                  selectedValue={modalData.role}
                  style={styles.modalTextInput}
                  onValueChange={(itemValue, itemIndex) => {}}>
                  {this.state.roles.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.displayName}
                      value={item.key}
                    />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButton,
                  ...ModalStyles.closeButton,
                  ...styles.modalButton,
                  backgroundColor: Colors.dark,
                }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Text style={ModalStyles.textStyle}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButton,
                  ...styles.modalButton,
                  backgroundColor: Colors.highlight,
                }}
                onPress={() => {
                  this.createTwoButtonAlert(modalData.name);
                }}>
                <Text style={ModalStyles.textStyle}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButton,
                  ...ModalStyles.openButton,
                  ...styles.modalButton,
                  backgroundColor: Colors.dark,
                }}
                onPress={() => {}}>
                <Text style={ModalStyles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default UpdatesList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  itemContainer: {
    padding: 10,
    marginTop: 3,
    backgroundColor: Colors.light,
  },
  itemTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.light,
    backgroundColor: Colors.highlight,
    marginLeft: -10,
    marginRight: -10,
    marginTop: -10,
    paddingLeft: 10,
  },
  itemExcerpt: {
    fontSize: 20,
    color: Colors.dark,
  },
  modalButton: {
    width: '30%',
  },
});
