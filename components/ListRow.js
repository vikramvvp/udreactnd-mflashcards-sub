import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { black, gray } from '../utils/colors'
import { Constants } from 'expo'

const ANIMATION_DURATION = 150;
const ROW_HEIGHT = 70;

class ListRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this._animated = new Animated.Value(0);
  }
  
  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION + 100,
    }).start();
  }

  _onPress = () => {
    const { onPressItem, id } = this.props;
    if (onPressItem) {
      Animated.timing(this._animated, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }).start(() => 
        Animated.timing(this._animated, {
          toValue: 1,
          duration: ANIMATION_DURATION + 100,
        }).start(() => onPressItem(id)));
    }
  };
  
  render() {
    const rowStyles = [
      styles.item,
      {
        height: this._animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ROW_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
      { opacity: this._animated },
      {
        transform: [
          { scale: this._animated },
          {
            rotate: this._animated.interpolate({
              inputRange: [0, 1],
              outputRange: ['35deg', '0deg'],
              extrapolate: 'clamp',
            })
          }
        ],
      },
    ];

    return (
      <TouchableOpacity onPress={this._onPress}>
        <Animated.View style={rowStyles}>
          <Text style={styles.title}>
            {this.props.id}
          </Text>
          <Text style={styles.description}>
            {this.props.itemInfo.questions ? this.props.itemInfo.questions.length : 0} cards
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

export default ListRow

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: black,
  },
  description: {
    fontSize: 13,
    color: gray,
  },
});
