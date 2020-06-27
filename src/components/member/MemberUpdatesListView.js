import React, {Component, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
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
        date: 'xx/xx/xxxx',
        description: 'consectetur adipiscing elit',
      },
      {
        id: 1,
        name: 'Susan',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 2,
        name: 'Robert',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 3,
        name: 'Mary',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 4,
        name: 'Mary',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 5,
        name: 'Mary',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 6,
        name: 'Mary',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 7,
        name: 'Mary',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 8,
        name: 'Mary',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 9,
        name: 'Mary',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
      {
        id: 10,
        name: 'Mary',
        date: 'xx/xx/xxxx',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
    ],
    modalVisible: false,
    modalText: 'dummy',
  };

  showModal = (item) => {
    this.setState({modalText: item});
    this.setModalVisible(true);
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  render() {
    const {modalVisible, modalText} = this.state;
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
              <Text style={styles.itemTitle}>{item.name}</Text>
              <View style={styles.itemExcerpt}>
                <Text style={styles.itemExcerptTextDate}>
                  Date: {item.date}
                </Text>
                <Text style={styles.itemExcerptText}>{item.description}</Text>
              </View>
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
              <Text style={ModalStyles.modalHeading}>Details</Text>
              <View style={ModalStyles.formInline}>
                <Text style={ModalStyles.modalTitle}>Date :</Text>
                <Text
                  style={{
                    ...ModalStyles.modalTextInput,
                    ...styles.modalTextInput,
                  }}>
                  {modalText.date}
                </Text>
              </View>
              <Text style={ModalStyles.modalText}>{modalText.description}</Text>

              <TouchableOpacity
                style={{
                  ...ModalStyles.basicButton,
                  backgroundColor: Colors.dark,
                }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Text style={ModalStyles.textStyle}>Close</Text>
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
