import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
//import MetricCard from './MetricCard'
import { white, black } from '../utils/colors'
import TextButton from './TextButton'
//import { addEntry } from '../actions'
//import { removeEntry } from '../utils/api'

class Card extends Component {
  state = {
    cardSequenceId: 0,
    correctCardsCount:0,
    showAnswer: false
  }

  reset = () => {
    const { goBack } = this.props
    goBack()
  }

  onToggleAnswer = () => {
    const currentShowAnswer = this.state.showAnswer
    this.setState({showAnswer: !currentShowAnswer})
  }

  toggleQA(showAnswer) {
    return (!showAnswer ? 
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 20 }}>
            {cards[cardSequenceId].question}
          </Text>
          <TextButton style={{padding: 10}} onPress={this.onToggleAnswer}>
            Answer
          </TextButton> 
        </View>
      :
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 20, color: gray }}>
            {cards[cardSequenceId].answer}
          </Text>
          <TextButton style={{padding: 10}} onPress={this.onToggleAnswer}>
            Question
          </TextButton> 
        </View>
    )
  }

  showResult() {
    const correctionPercent = this.state.correctCardsCount / this.props.cards.length
    return (
      <View style={{ paddingBottom: 50 }}>
        <Text style={{ fontSize: 20 }}>
          {correctionPercent >= 0.8 ? 
            `Excellent! You answered ${this.state.correctCardsCount} out of ${this.props.cards.length} correctly; go back and study another deck.`
          :
            `Excellent! You answered ${this.state.correctCardsCount} out of ${this.props.cards.length} correctly; go back and study another deck.`
          }
        </Text>
      </View>
    )
  }
  
  onCorrect = () => {
    const {correctCardsCount, cardSequenceId} = this.state
    this.setState({correctCardsCount: ++correctCardsCount, cardSequenceId: ++cardSequenceId})
    
  }

  onIncorrect = () => {
    const {cardSequenceId} = this.state
    this.setState({cardSequenceId: ++cardSequenceId})
  }

  render() {
    const { cards } = navigation.state.params
    const { cardSequenceId, showAnswer} = this.state
    return (
    <View style={styles.container}>
      <View >
        <Text>{cardSequenceId + 1} / {cards.length}</Text> 
      </View>
      {cards.length !== (cardSequenceId + 1) ? 
        <View style={styles.container}>
          {toggleQA(showAnswer)}
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={this.onCorrect}
            >
              <Text>Correct</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.blackButton}
              onPress={this.onIncorrect}
            >
              <Text>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.container}>
          {this.showResult()}
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={this.onRestart}
            >
              <Text>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.blackButton}
              onPress={this.props.navigation.dispatch(NavigationActions.back({key: 'DeckList'}))}
            >
              <Text>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
      
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
)(Card)