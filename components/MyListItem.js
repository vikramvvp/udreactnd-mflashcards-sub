import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, black, red } from '../utils/colors'
import { Constants } from 'expo'
import { SafeAreaView } from 'react-navigation'

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.itemInfo, this.props.backHandler);
  };

  render() {
    //console.log('thisprops', this.props)
    return (
      <TouchableOpacity onPress={this._onPress}>
        <SafeAreaView
          style={styles.itemContainer}
          forceInset={{ vertical: 'never' }}
        >
          <View style={styles.item}>
            <Text style={styles.title}>
              {this.props.id}
            </Text>
            <Text style={styles.description}>
              {this.props.itemInfo.questions ? this.props.itemInfo.questions.length : 0} cards
          </Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  }
}

export default MyListItem

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  statusBarUnderlay: {
    backgroundColor: '#673ab7',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Constants.statusBarHeight,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
});
