import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
//import MetricCard from './MetricCard'
import { white } from '../utils/colors'
import TextButton from './TextButton'
//import { addEntry } from '../actions'
//import { removeEntry } from '../utils/api'

class DeckInfo extends Component {
  
  reset = () => {
    const { goBack } = this.props
    goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <TextButton style={{margin: 20}} onPress={this.reset}>
          RESET
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

// function mapStateToProps (state, { navigation }) {
//   const { entryId } = navigation.state.params

//   return {
//     entryId,
//     metrics: state[entryId],
//   }
// }

function mapDispatchToProps (dispatch, { navigation }) {
  // const { entryId } = navigation.state.params

  return {
    // remove: () => dispatch(addEntry({
    //   [entryId]: timeToString() === entryId
    //     ? getDailyReminderValue()
    //     : null
    // })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(DeckInfo)