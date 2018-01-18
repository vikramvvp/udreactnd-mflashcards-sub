import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
import Card from './Card'
import { white, black } from '../utils/colors'
import TextButton from './TextButton'
//import { addEntry } from '../actions'
//import { removeEntry } from '../utils/api'

class DeckInfo extends Component {

  reset = () => {
    const { goBack } = this.props
    goBack()
  }

  onStartQuiz = (questions) => {
    this.props.navigation.navigate(
      'Card',
      { cards }
    )
  }

  onAddCard = () => {
    this.props.navigation.navigate(
      'AddCard',
      { deckId }
    )
  }

  render() {
    const { deckInfo } = navigation.state.params
    const { cards: questions } = deckInfo
    return (
      <View style={styles.container}>
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 20 }}>
            {deckInfo.title}
          </Text>
          <Text style={{ fontSize: 16, color: gray }}>
            {questions ? questions.length : 0} cards
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.whiteButton}
            onPress={this.onAddCard}
          >
            <Text>Add Card</Text>
          </TouchableOpacity>
        </View>
        {cards && cards.length > 0 ? 
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.blackButton}
            onPress={this.onStartQuiz(cards)}
          >
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        : ''}
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
  blackButton: {
    color: white,
    alignItems: 'center',
    backgroundColor: black,
    padding: 10
  },
  whiteButton: {
    color: black,
    alignItems: 'center',
    backgroundColor: white,
    padding: 10
  },
})

// function mapStateToProps (state, { navigation }) {
//   const { entryId } = navigation.state.params

//   return {
//     entryId,
//     metrics: state[entryId],
//   }
// }

function mapDispatchToProps(dispatch, { navigation }) {
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