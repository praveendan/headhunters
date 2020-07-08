import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {RolesDropdownList} from '../shared/Strings';
import {Colors} from '../shared/ColourSheet';
import ModalStyles from '../shared/Modal.style';
export default function AdminMembersListView({route, navigation}) {
  const [names, setNames] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [previousModalData, setPreviousModalData] = useState({});
  const [roles, setRoles] = useState(RolesDropdownList);

  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      let userId = user.email.split('@')[0];
      setCurrentUserId(userId);
    }

    database()
      .ref('users/')
      .once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
        //  this.state.compareUser = snapshot.val();
        console.log(snapshot.val());
        setNames(snapshot.val());
        if (snapshot.val() === null) {
          //   this.clearUserId();
        } else {
          console.log('ready nigga');
          //   this.setState({
          //      isReadyToLogin: true,
          //   });
        }
      });
  }, []);

  let showModal = (item) => {
    setModalData(item);
    setPreviousModalData(item);

    setSelectedName(item.user_name);
    setSelectedKey(item.user_key);
    setSelectedRole(item.user_role);
    setModalVisible(true);
  };

  let closeModal = (item) => {
    item = previousModalData;
    setModalVisible(!modalVisible);
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

  var generateList = () => {
    if (names !== null) {
      return (
        <ScrollView>
          {names.map((item, index) => (
            <TouchableOpacity
              key={item.user_id}
              style={styles.itemContainer}
              onPress={() => {
                showModal(item);
              }}>
              <Text style={styles.itemTitle}>User name: {item.user_name}</Text>
              <Text style={styles.itemExcerpt}>Role: {item.user_role}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
  };

  var generateActivityIndicator = () => {
    if (names === null) {
      return <ActivityIndicator size="large" color={Colors.highlight} />;
    }
  };

  var generateRolePicker = (userInfo) => {
    if (currentUserId !== modalData.user_id) {
      return (
        <View style={ModalStyles.formInline}>
          <Text style={ModalStyles.modalTitle}>Type</Text>
          <Picker
            style={ModalStyles.modalTextInput}
            selectedValue={selectedRole}
            onValueChange={(itemValue, _itemIndex) => {
              setSelectedRole(itemValue);
            }}>
            {roles.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.displayName}
                value={item.key}
              />
            ))}
          </Picker>
        </View>
      );
    }
  };

  var generateDeleteButton = (userInfo) => {
    if (currentUserId !== modalData.user_id) {
      return (
        <TouchableOpacity
          style={{
            ...ModalStyles.basicButton,
            ...styles.modalButton,
            backgroundColor: Colors.highlight,
          }}
          onPress={() => {
            createTwoButtonAlert(userInfo.user_name);
          }}>
          <Text style={ModalStyles.textStyle}>Delete</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {generateActivityIndicator()}
      {generateList()}
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
                value={selectedName}
                onChangeText={(itemValue) => {
                  setSelectedName(itemValue);
                }}
              />
            </View>
            <View style={ModalStyles.formInline}>
              <Text style={ModalStyles.modalTitle}>Key</Text>
              <TextInput
                style={ModalStyles.modalTextInput}
                value={selectedKey}
                onChangeText={(itemValue) => {
                  setSelectedKey(itemValue);
                }}
              />
            </View>
            {generateRolePicker(modalData)}

            <TouchableOpacity
              style={{
                ...ModalStyles.basicButton,
                ...ModalStyles.closeButton,
                ...styles.modalButton,
                backgroundColor: Colors.dark,
              }}
              onPress={() => {
                closeModal(modalData);
              }}>
              <Text style={ModalStyles.textStyle}>Close</Text>
            </TouchableOpacity>

            {generateDeleteButton(modalData)}

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
