import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Foundation';
import {
  LocalizedEventsGroups,
  SendMessageButtonText,
  AdminNewsListMessages,
  Constants,
} from '../shared/Strings';
import {Colors} from '../shared/ColourSheet';
import ModalStyles from '../shared/Modal.style';
export default function AdminMembersListView({route, navigation}) {
  const [news, setNews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedNewsDescription, setSelectedNewsDescription] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [sendButtonText, setSendButtonText] = useState(
    SendMessageButtonText.SEND,
  );

  const [numberOfNews, setNumberOfNews] = useState(0);

  useEffect(() => {
    loadNews();
  }, []);

  let loadNews = () => {
    database()
      .ref('news/' + LocalizedEventsGroups.GLOBAL)
      .limitToLast(Constants.NEWS_SHOW_LIMIT)
      .on('value', (snapshot) => {
        if (snapshot.val() === null) {
          //   this.clearUserId();
        } else {
          setNews(snapshot.val());
        }
      });
  };

  let showModal = (item) => {
    if (item !== null) {
      setSelectedId(item.id);
      setSelectedTitle(item.name);
      setSelectedNewsDescription(item.description);
    }

    setModalVisible(true);
  };

  let closeModal = () => {
    setSelectedId('');
    setSelectedTitle('');
    setSelectedNewsDescription('');
    setSuccessMessage('');
    setErrorMessage('');
    setModalVisible(!modalVisible);
  };

  var getExcerpt = (string) => {
    if (string.length > 100) {
      return string.substring(0, 100) + '...  Read more';
    } else {
      return string;
    }
  };

  var sendMessage = () => {
    if (selectedNewsDescription !== '' && selectedTitle !== '') {
      setSendButtonText(SendMessageButtonText.SENDING);
      setSuccessMessage('');
      setErrorMessage('');
      if (selectedId === '') {
        addNewNews();
      } else {
        updateNews();
      }
    } else {
      setErrorMessage(AdminNewsListMessages.EMPTY_FIELDS_ERROR);
    }
  };

  var addNewNews = () => {
    var dbRef = database()
      .ref('news/' + LocalizedEventsGroups.GLOBAL)
      .push();

    dbRef
      .update({
        date: '01/01/2020',
        description: selectedNewsDescription,
        id: dbRef.key,
        name: selectedTitle,
        timestamp: new Date().getTime(),
      })
      .then(() => {
        setSuccessMessage(AdminNewsListMessages.SAVED_SUCCESS);
        deleteOldestNews();
      })
      .catch((_error) => {
        setErrorMessage(AdminNewsListMessages.SAVE_ERROR);
        database()
          .ref('news/' + LocalizedEventsGroups.GLOBAL + '/' + dbRef.key)
          .remove();
      })
      .finally(() => {
        setSendButtonText(SendMessageButtonText.SEND);
      });
  };

  var updateNews = () => {
    database()
      .ref('news/' + LocalizedEventsGroups.GLOBAL + '/' + selectedId)
      .update({
        date: '01/01/2020',
        description: selectedNewsDescription,
        name: selectedTitle,
        // id: selectedId,
        timestamp: new Date().getTime(),
      })
      .then(() => {
        setSuccessMessage(AdminNewsListMessages.SAVED_SUCCESS);
      })
      .catch((_error) => {
        setErrorMessage(AdminNewsListMessages.SAVE_ERROR);
      })
      .finally(() => {
        setSendButtonText(SendMessageButtonText.SEND);
      });
  };

  var deleteOldestNews = () => {
    if (Constants.NEWS_LIMIT <= numberOfNews) {
      let dbInstance = database();
      let queryString = 'news/' + LocalizedEventsGroups.GLOBAL + '/';
      dbInstance
        .ref(queryString)
        .limitToFirst(1)
        .once('value')
        .then((snapshot) => {
          var item = snapshot.val();
          dbInstance.ref(queryString + Object.keys(item)[0]).remove();
        });
    }
  };

  var generateList = () => {
    if (news !== null) {
      return (
        <ScrollView>
          {Object.keys(news).map((key, index) => {
            if (news[key] !== null) {
              return (
                <TouchableOpacity
                  key={news[key].id}
                  style={styles.itemContainer}
                  onPress={() => {
                    showModal(news[key]);
                  }}>
                  <Text style={styles.itemTitle}>{news[key].name}</Text>
                  <Text style={styles.itemExcerpt}>
                    {getExcerpt(news[key].description)}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      {news === null && (
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
            <Text style={ModalStyles.modalHeading}>News update</Text>
            <View style={ModalStyles.formInline}>
              <Text style={ModalStyles.modalTitle}>Title</Text>
              <TextInput
                style={ModalStyles.modalTextInput}
                value={selectedTitle}
                onChangeText={(itemValue) => {
                  setSelectedTitle(itemValue);
                }}
              />
            </View>
            <View
              style={{
                ...ModalStyles.formInlineMultiline,
              }}>
              <TextInput
                multiline
                style={ModalStyles.modalfullWidthMultilineTextInput}
                value={selectedNewsDescription}
                placeholder="Enter your message"
                onChangeText={(itemValue) => {
                  setSelectedNewsDescription(itemValue);
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
                  closeModal();
                }}>
                <Text style={ModalStyles.textStyle}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButtonRelative,
                  ...ModalStyles.openButtonRelative,
                  backgroundColor: Colors.dark,
                }}
                onPress={() => {
                  sendMessage();
                }}>
                <Text style={ModalStyles.textStyle}>{sendButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          showModal(null);
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
