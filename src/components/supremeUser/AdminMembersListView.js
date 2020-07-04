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
import {Colors} from '../shared/ColourSheet';
import ModalStyles from '../shared/Modal.style';

export default function AdminMembersListView({route, navigation}) {
  const [names, setNames] = useState([
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
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState('dummy');
  const [name, setName] = useState(null);
  const [roles, setRoles] = useState([
    {
      key: 'member',
      displayName: 'Member',
    },
  ]);

  let showModal = (item) => {
    setModalData(item);
    setModalVisible(true);
  };

  let createTwoButtonAlert = (username) =>
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

  return (
    <View style={styles.container}>
      <ScrollView>
        {names.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => {
              showModal(item);
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
              <Text style={ModalStyles.modalTitle}>Type</Text>
            </View>
            <TouchableOpacity
              style={{
                ...ModalStyles.basicButton,
                ...ModalStyles.closeButton,
                ...styles.modalButton,
                backgroundColor: Colors.dark,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
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
                createTwoButtonAlert(modalData.name);
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
