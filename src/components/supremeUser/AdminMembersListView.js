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
import functions from '@react-native-firebase/functions';
import Icon from 'react-native-vector-icons/Foundation';
import {
  Roles,
  RolesDropdownList,
  AdminMemberListMessages,
  LocalizedEventsGroups,
  SaveButtonText,
  DeleteButtonText,
  AppData,
} from '../shared/Strings';
import {Colors} from '../shared/ColourSheet';
import ModalStyles from '../shared/Modal.style';
export default function AdminMembersListView({route, navigation}) {
  const [names, setNames] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [previousModalData, setPreviousModalData] = useState({});
  const [roles, setRoles] = useState(RolesDropdownList);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState(SaveButtonText.SAVE);
  const [deleteButtonText, setDeleteButtonText] = useState(
    DeleteButtonText.DELETE,
  );
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      let userId = user.email.split('@')[0];
      setCurrentUserId(userId);
    }
    loadUsers();
  }, []);
  let loadUsers = () => {
    database()
      .ref('users/')
      .on('value', (snapshot) => {
        if (snapshot.val() === null) {
          //   this.clearUserId();
        } else {
          setNames(snapshot.val());
        }
      });
  };
  let clearSelectedState = () => {
    setSelectedName('');
    setSelectedKey('');
    setSelectedId('');
    setSelectedRole(Roles.MEMBER);
  };
  let showModal = (item) => {
    setModalData(item);
    setPreviousModalData(item);
    setSelectedId(item.user_id);
    setSelectedName(item.user_name);
    setSelectedKey(item.user_key);
    setSelectedRole(item.user_role);
    setModalVisible(true);
  };
  let closeModal = (item) => {
    item = previousModalData;
    setModalVisible(!modalVisible);
    clearSelectedState();
    setErrorMessage('');
    setSuccessMessage('');
  };

  let createTwoButtonAlert = (username) => {
    Alert.alert(
      'Confirmation',
      'Are you sure that you want to  remove ' + username + '?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteUser()},
      ],
      {cancelable: false},
    );
  };

  var deleteUser = async () => {
    setDeleteButtonText(DeleteButtonText.DELETING);

    var deleteUserCall = functions().httpsCallable('deleteUser');
    deleteUserCall({
      user_id: selectedId,
      //userEmail: selectedId + AppData.USER_SUFFIX,
    })
      .then(function (result) {
        setSuccessMessage(AdminMemberListMessages.DELETE_SUCCESS);
      })
      .catch(function (error) {
        setErrorMessage(AdminMemberListMessages.DELETE_ERROR);
      })
      .finally(() => {
        setDeleteButtonText(DeleteButtonText.DELETE);
        clearSelectedState();
      });
  };

  var generateList = () => {
    if (names !== null) {
      return (
        <ScrollView>
          {Object.keys(names).map((key, index) => {
            if (names[key] !== null) {
              return (
                <TouchableOpacity
                  key={names[key].user_id}
                  style={styles.itemContainer}
                  onPress={() => {
                    showModal(names[key]);
                  }}>
                  <Text style={styles.itemTitle}>
                    User name: {names[key].user_name}
                  </Text>
                  <Text style={styles.itemExcerpt}>
                    Role: {names[key].user_role}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      );
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
    if (currentUserId !== modalData.user_id && selectedId !== '') {
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
          <Text style={ModalStyles.textStyle}>{deleteButtonText}</Text>
        </TouchableOpacity>
      );
    }
  };
  var openAddUserModal = () => {
    clearSelectedState();
    setAddUserModalVisible(true);
  };
  var closeAddUserModal = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setAddUserModalVisible(!addUserModalVisible);
  };
  var addMember = () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (selectedId === '' || selectedKey === '' || selectedName === '') {
      setErrorMessage(AdminMemberListMessages.EMPTY_FIELDS_ERROR);
    } else if (selectedKey.length < 6) {
      setErrorMessage(AdminMemberListMessages.MEMBER_KEY_LENGTH_ERROR);
    } else {
      setSaveButtonText(SaveButtonText.SAVING);

      var addUserCall = functions().httpsCallable('addUser');
      addUserCall({
        region: LocalizedEventsGroups.GLOBAL,
        user_id: selectedId,
        user_key: selectedKey,
        user_name: selectedName,
        user_role: selectedRole,
        user_email: selectedId + AppData.USER_SUFFIX,
      })
        .then(function (_result) {
          setSuccessMessage(AdminMemberListMessages.SAVED_SUCCESS);
        })
        .catch(function (_error) {})
        .finally(() => {
          setSaveButtonText(SaveButtonText.SAVE);
        });
    }
  };
  var updateMember = () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (selectedId === '' || selectedKey === '' || selectedName === '') {
      setErrorMessage(AdminMemberListMessages.EMPTY_FIELDS_ERROR);
    } else if (selectedKey.length < 6) {
      setErrorMessage(AdminMemberListMessages.MEMBER_KEY_LENGTH_ERROR);
    } else {
      setSaveButtonText(SaveButtonText.SAVING);
      const newReference = database().ref('/users');
      newReference
        .child(selectedId)
        .update({
          region: LocalizedEventsGroups.GLOBAL,
          user_id: selectedId,
          user_key: selectedKey,
          user_name: selectedName,
          user_role: selectedRole,
        })
        .then(() => {
          setSuccessMessage(AdminMemberListMessages.SAVED_SUCCESS);
        })
        .catch((error) => {})
        .finally(() => {
          setSaveButtonText(SaveButtonText.SAVE);
        });
    }
  };
  var generateAddUserModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addUserModalVisible}
        onRequestClose={() => {}}>
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalView}>
            <Text style={ModalStyles.modalHeading}>Add Member</Text>
            <View style={ModalStyles.formInline}>
              <Text style={ModalStyles.modalTitle}>Name</Text>
              <TextInput
                style={ModalStyles.modalTextInput}
                onChangeText={(itemValue) => {
                  setSelectedName(itemValue);
                }}
              />
            </View>
            <View style={ModalStyles.formInline}>
              <Text style={ModalStyles.modalTitle}>Key</Text>
              <TextInput
                style={ModalStyles.modalTextInput}
                onChangeText={(itemValue) => {
                  setSelectedKey(itemValue);
                }}
              />
            </View>
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
            <View style={ModalStyles.formInline}>
              <Text style={ModalStyles.modalTitle}>Member Id</Text>
              <TextInput
                style={ModalStyles.modalTextInput}
                onChangeText={(itemValue) => {
                  setSelectedId(itemValue);
                }}
              />
            </View>
            {errorMessage !== '' && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            {successMessage !== '' && (
              <Text style={styles.successMessage}>{successMessage}</Text>
            )}
            <TouchableOpacity
              style={{
                ...ModalStyles.basicButton,
                ...ModalStyles.closeButton,
                ...styles.modalButton,
                backgroundColor: Colors.dark,
              }}
              onPress={() => {
                closeAddUserModal();
              }}>
              <Text style={ModalStyles.textStyle}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...ModalStyles.basicButton,
                ...ModalStyles.openButton,
                ...styles.modalButton,
                backgroundColor: Colors.dark,
              }}
              onPress={() => {
                addMember();
              }}>
              <Text style={ModalStyles.textStyle}>{saveButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      {names === null && (
        <ActivityIndicator size="large" color={Colors.highlight} />
      )}
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
              <Text style={ModalStyles.modalTitle}>Id</Text>
              <Text style={ModalStyles.modalFormInlineText}>{selectedId}</Text>
            </View>
            <View style={ModalStyles.formInline}>
              <Text style={ModalStyles.modalTitle}>Key</Text>
              <Text style={ModalStyles.modalFormInlineText}>{selectedKey}</Text>
            </View>
            {generateRolePicker(modalData)}
            {errorMessage !== '' && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            {successMessage !== '' && (
              <Text style={styles.successMessage}>{successMessage}</Text>
            )}
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
            {selectedId !== '' && (
              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButton,
                  ...ModalStyles.openButton,
                  ...styles.modalButton,
                  backgroundColor: Colors.dark,
                }}
                onPress={() => {
                  updateMember();
                }}>
                <Text style={ModalStyles.textStyle}>{saveButtonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
      {generateAddUserModal()}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          openAddUserModal();
        }}>
        <Icon name="plus" size={30} color={Colors.light} />
      </TouchableOpacity>
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
  floatingButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.highlight,
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorMessage: {
    color: Colors.highlight,
  },
  successMessage: {
    color: Colors.dark,
  },
});
