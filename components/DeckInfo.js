import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
import Card from './Card'
import AddCard from './AddCard'
import { white, black, gray } from '../utils/colors'
import TextButton from './TextButton'
//import { addEntry } from '../actions'
//import { removeEntry } from '../utils/api'

const screenWidth = Dimensions.get('window').width;


class DeckInfo extends Component {
  
  reset = () => {
    const { goBack } = this.props
    goBack()
  }

  onStartQuiz = () => {
    const { navigation } = this.props
    const { deckInfo } = navigation.state.params
    this.props.navigation.navigate(
      'Card',
      { cards: deckInfo.questions }
    )
  }

  onAddCard = () => {
    const { navigation } = this.props
    const { deckInfo } = navigation.state.params
    this.props.navigation.navigate(
      'AddCard',
      { deckId: deckInfo.id }
    )
  }

  render() {
    const { navigation } = this.props
    const { deckInfo } = navigation.state.params
    const cards = deckInfo.questions
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 20 }}>
            {deckInfo.title}
          </Text>
          <Text style={{ fontSize: 16, color: gray }}>
            {cards ? cards.length : 0} cards
          </Text>
        </View>
        <View style={{ paddingBottom: 20  }}>
          <TouchableOpacity
            style={styles.whiteButton}
            onPress={this.onAddCard}
          >
            <Text style={{color:black}}>Add Card</Text>
          </TouchableOpacity>
        </View>
        {cards && cards.length > 0 ? 
        <View style={{ paddingBottom: 20 }}>
          <TouchableOpacity
            style={styles.blackButton}
            onPress={this.onStartQuiz}
          >
            <Text style={{color:white}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        : ''}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems:'center',
    padding: 15,
  },
  blackButton: {
    width: screenWidth/2,
    alignItems: 'center',
    backgroundColor: black,
    padding: 10
  },
  whiteButton: {
    width: screenWidth/2,
    alignItems: 'center',
    backgroundColor: gray,
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