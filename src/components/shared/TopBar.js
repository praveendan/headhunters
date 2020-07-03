import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {Colors} from './ColourSheet';
class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoStyle}
          source={require('../../img/HH_logo.png')}
        />
        <Icon name="list" size={30} color={Colors.light} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 100,
    flexDirection: 'row', // row
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
  },
  logoStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
export default TopBar;
