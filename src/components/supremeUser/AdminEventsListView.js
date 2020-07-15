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
  Platform,
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Foundation';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const queryString = 'events/' + LocalizedEventsGroups.GLOBAL + '/';

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    loadNews();
  }, []);

  let loadNews = () => {
    database()
      .ref(queryString)
      .limitToLast(Constants.NEWS_SHOW_LIMIT)
      .on('value', (snapshot) => {
        if (snapshot.val() === null) {
          //   this.clearUserId();
        } else {
          let tempArray = [];
          let newsCount = 0;
          for (const [_key, value] of Object.entries(snapshot.val())) {
            tempArray.push(value);
            newsCount++;
          }
          setNumberOfNews(newsCount);
          setNews(tempArray);
        }
      });
  };

  let showModal = (item) => {
    if (item !== null) {
      setSelectedId(item.id);
      setSelectedTitle(item.name);
      setSelectedNewsDescription(item.description);
      setStartDate(new Date(item.start_date));
      setEndDate(new Date(item.end_date));
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
    var dbRef = database().ref(queryString).push();
    dbRef
      .update({
        start_date: startDate.toString(),
        end_date: endDate.toString(),
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
          .ref(queryString + dbRef.key)
          .remove();
      })
      .finally(() => {
        setSendButtonText(SendMessageButtonText.SEND);
      });
  };

  var updateNews = () => {
    database()
      .ref(queryString + selectedId)
      .update({
        description: selectedNewsDescription,
        name: selectedTitle,
        start_date: startDate.toString(),
        end_date: endDate.toString(),
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
    if (Constants.EVENTS_LIMIT <= numberOfNews) {
      let dbInstance = database();

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
          {news.map((item, index) => {
            if (item !== null) {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.itemContainer}
                  onPress={() => {
                    showModal(item);
                  }}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemExcerpt}>
                    {getExcerpt(item.description)}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      );
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDate(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showMode = (currentMode, isStart) => {
    if (isStart === true) {
      setShow(true);
    } else {
      setShowEndDate(true);
    }

    setMode(currentMode);
  };

  const showStartDatepicker = () => {
    showMode('date', true);
  };

  const showStartTimepicker = () => {
    showMode('time', true);
  };

  const showEndDatepicker = () => {
    showMode('date', false);
  };

  const showEndTimepicker = () => {
    showMode('time', false);
  };

  const convertDate = (value) => {
    return value.toDateString().substring(4);
  };

  const convertTime = (value) => {
    return value.toTimeString().substring(0, 5);
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
            <Text style={ModalStyles.modalHeading}>Event update</Text>
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
            <View style={ModalStyles.formInline}>
              <Text style={ModalStyles.modalTitle}>Start</Text>
              <Text
                style={ModalStyles.modalFormInlineTextHalf}
                onPress={showStartDatepicker}>
                {convertDate(startDate)}
              </Text>
              <Text
                style={ModalStyles.modalFormInlineTextHalf}
                onPress={showStartTimepicker}>
                {convertTime(startDate)}
              </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>
            <View style={ModalStyles.formInline}>
              <Text style={ModalStyles.modalTitle}>End</Text>
              <Text
                style={ModalStyles.modalFormInlineTextHalf}
                onPress={showEndDatepicker}>
                {convertDate(endDate)}
              </Text>
              <Text
                style={ModalStyles.modalFormInlineTextHalf}
                onPress={showEndTimepicker}>
                {convertTime(endDate)}
              </Text>
              {showEndDate && (
                <DateTimePicker
                  testID="endDateTimePicker"
                  value={endDate}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onEndDateChange}
                />
              )}
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
