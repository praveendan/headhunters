import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {Colors} from '../shared/ColourSheet';
import ModalStyles from '../shared/Modal.style';
import {MemberItemType, LocalizedEventsGroups} from '../shared/Strings';

export default function UpdatesList({route, navigation}) {
  const {subType} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('dummy');

  const [dataList, setDataList] = useState(null);

  auth().onAuthStateChanged((user) => {
    if (user) {
    } else {
    }
  });

  useEffect(() => {
    database()
      .ref(subType + '/' + LocalizedEventsGroups.GLOBAL + '/')
      .once('value')
      .then((snapshot) => {
        setDataList(snapshot.val());
      });
  }, []);

  var showModal = (item) => {
    setModalText(item);
    setModalVisible(true);
  };

  var getExcerpt = (string) => {
    if (string.length > 100) {
      return string.substring(0, 100) + '...  Read more';
    } else {
      return string;
    }
  };

  var convertDateString = (timeStamp) => {
    return new Date(timeStamp).toDateString();
  };

  var generateList = () => {
    if (dataList !== null) {
      return <ScrollView>{generateListItems()}</ScrollView>;
    }
  };

  var generateListItems = () => {
    for (let key in dataList) {
      let item = dataList[key];
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.itemContainer}
          onPress={() => {
            showModal(item);
          }}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <View style={styles.itemExcerpt}>
            <Text style={styles.itemExcerptTextDate}>
              {convertDateString(item.timestamp)}
            </Text>
            <Text style={styles.itemExcerptText}>
              {getExcerpt(item.description)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  var generateActivityIndicator = () => {
    if (dataList === null) {
      return <ActivityIndicator size="large" color={Colors.highlight} />;
    }
  };

  const convertDate = (value) => {
    return new Date(value).toDateString().substring(4);
  };

  const convertTime = (value) => {
    return new Date(value).toTimeString().substring(0, 5);
  };

  var generateEventDates = (val) => {
    if (subType === MemberItemType.EVENTS) {
      return (
        <View>
          <View style={ModalStyles.formInline}>
            <Text style={ModalStyles.modalTitle}>Start Date :</Text>
            <Text style={ModalStyles.modalFormInlineTextHalf}>
              {convertDate(val.start_date)}
            </Text>
            <Text style={ModalStyles.modalFormInlineTextHalf}>
              {convertTime(val.start_date)}
            </Text>
          </View>
          <View style={ModalStyles.formInline}>
            <Text style={ModalStyles.modalTitle}>End Date :</Text>
            <Text style={ModalStyles.modalFormInlineTextHalf}>
              {convertDate(val.end_date)}
            </Text>
            <Text style={ModalStyles.modalFormInlineTextHalf}>
              {convertTime(val.end_date)}
            </Text>
          </View>
        </View>
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
            <Text style={ModalStyles.modalHeading}>{modalText.name}</Text>
            {generateEventDates(modalText)}

            <Text style={ModalStyles.modalText}>{modalText.description}</Text>
            <TouchableOpacity
              style={{
                ...ModalStyles.basicButton,
                backgroundColor: Colors.dark,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={ModalStyles.textStyle}>Close</Text>
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
  itemExcerpt: {},
  itemExcerptTextDate: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemExcerptText: {
    fontSize: 20,
    color: Colors.dark,
  },
  modalTextInput: {
    marginTop: 10,
  },
});
