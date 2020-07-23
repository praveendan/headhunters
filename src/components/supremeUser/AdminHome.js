import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import functions from '@react-native-firebase/functions';

import {Colors} from '../shared/ColourSheet';
import CommonStyles from '../shared/Common.style';
import ModalStyles from '../shared/Modal.style';
import {NotificationStatusMessages} from '../shared/Strings';

export default function MemberHome({route, navigation}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notificationModalVisible, setNotificationModalVisible] = useState(
    false,
  );

  const [notificationMessageText, setNotificationMessageText] = useState('');
  var openMembers = () => {
    navigation.navigate('AdminMembersListView');
  };

  var openNews = () => {
    navigation.navigate('AdminNewsListView');
  };

  var openEvents = () => {
    navigation.navigate('AdminEventsListView');
  };

  var sendNotificationMessage = () => {
    setSuccessMessage('');
    setErrorMessage('');
    if (notificationMessageText !== '') {
      var sendNotificationMessageCall = functions().httpsCallable(
        'sendNotificationMessage',
      );
      sendNotificationMessageCall({
        text: notificationMessageText,
        region: 'global',
      })
        .then(function (result) {
          setSuccessMessage(NotificationStatusMessages.SAVED_SUCCESS);
        })
        .catch(function (error) {
          setErrorMessage(NotificationStatusMessages.SAVE_ERROR);
        });
    } else {
      setErrorMessage(NotificationStatusMessages.EMPTY_FIELDS_ERROR);
    }
  };

  return (
    <View style={CommonStyles.container}>
      <View style={CommonStyles.viewContainer}>
        <TouchableOpacity
          style={styles.viewContainerItem}
          onPress={openMembers}>
          <View style={styles.viewContainerItemMain}>
            <Text style={styles.viewContainerItemHeading}>MEMBERS</Text>
            <Text style={styles.viewContainerItemSubHeading}>
              ADD, REMOVE, EDIT MEMBERS
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewContainerItem} onPress={openNews}>
          <View style={styles.viewContainerItemMain}>
            <Text style={styles.viewContainerItemHeading}>NEWS</Text>
            <Text style={styles.viewContainerItemSubHeading}>
              ADD, EDIT NEWS
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewContainerItem} onPress={openEvents}>
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
            setNotificationModalVisible(true);
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
            <Text style={ModalStyles.modalHeading}>Send a notification</Text>
            <View
              style={{
                ...ModalStyles.formInlineMultiline,
              }}>
              <TextInput
                multiline
                style={ModalStyles.modalfullWidthMultilineTextInput}
                placeholder="Enter your message"
                onChangeText={(itemValue) => {
                  setNotificationMessageText(itemValue);
                }}
              />
            </View>
            {errorMessage !== '' && (
              <Text style={ModalStyles.errorMessage}>{errorMessage}</Text>
            )}
            {successMessage !== '' && (
              <Text style={ModalStyles.successMessage}>{successMessage}</Text>
            )}
            <View style={ModalStyles.bottomButtonContainer}>
              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButtonRelative,
                  ...ModalStyles.closeButtonRelative,
                  backgroundColor: Colors.highlight,
                }}
                onPress={() => {
                  setSuccessMessage('');
                  setErrorMessage('');
                  setNotificationModalVisible(!notificationModalVisible);
                }}>
                <Text style={ModalStyles.textStyle}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButtonRelative,
                  ...ModalStyles.openButtonRelative,
                  backgroundColor: Colors.dark,
                }}
                onPress={sendNotificationMessage}>
                <Text style={ModalStyles.textStyle}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
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
    textAlignVertical: 'top',
  },
  formInline: {
    height: '50%',
  },
});
