import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoStyle}
          source={require('../img/HH_logo.png')}
        />
        <Text>Right</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 100,
    flexDirection: 'row', // row
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
  },
  logoStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
export default TopBar;
