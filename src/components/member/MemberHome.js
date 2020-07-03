import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {Colors} from '../shared/ColourSheet';
import Icon from 'react-native-vector-icons/Foundation';
import CommonStyles from '../shared/Common.style';
import {MemberItemType} from '../shared/Strings';

export default function MemberHome({route, navigation}) {
  var openEvents = () => {
    navigation.navigate('MemberUpdatesList', {
      subType: MemberItemType.EVENTS,
    });
  };

  var openNews = () => {
    navigation.navigate('MemberUpdatesList', {
      subType: MemberItemType.NEWS,
    });
  };

  return (
    <View style={CommonStyles.container}>
      <View style={CommonStyles.viewContainer}>
        <TouchableOpacity style={styles.viewContainerItem} onPress={openEvents}>
          <View style={styles.viewContainerItemMain}>
            <Text style={styles.viewContainerItemHeading}>EVENTS</Text>
            <Text style={styles.viewContainerItemSubHeading}>
              UPCOMING EVENTS
            </Text>
          </View>
          <Text style={styles.viewContainerItemViewMoreItems}>
            VIEW ALL EVENTS
          </Text>
          <Icon
            style={styles.viewContainerItemViewMoreItemsArrow}
            name="arrow-right"
            color={Colors.light}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewContainerItem} onPress={openNews}>
          <View style={styles.viewContainerItemMain}>
            <Text style={styles.viewContainerItemHeading}>NEWS</Text>
            <Text style={styles.viewContainerItemSubHeading}>
              INTERCOM NEWS AND UPDATES
            </Text>
          </View>
          <Text style={styles.viewContainerItemViewMoreItems}>
            VIEW NEWS UPDATES
          </Text>
          <Icon
            style={styles.viewContainerItemViewMoreItemsArrow}
            name="arrow-right"
            color={Colors.light}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewContainerItem: {
    height: '50%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: Colors.light,
  },
  viewContainerItemMain: {
    flex: 1,
  },
  viewContainerItemHeading: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.highlight,
  },
  viewContainerItemSubHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  viewContainerItemViewMoreItems: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: Colors.dark,
    color: Colors.light,
    marginLeft: -20,
    marginRight: -20,
    textAlign: 'right',
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  viewContainerItemViewMoreItemsArrow: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: Colors.highlight,
    color: Colors.light,
    marginLeft: -20,
    marginRight: -20,
    textAlign: 'right',
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
