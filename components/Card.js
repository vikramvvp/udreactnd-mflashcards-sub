import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
//import MetricCard from './MetricCard'
import { white, black, green, red, gray } from '../utils/colors'
import TextButton from './TextButton'
//import { addEntry } from '../actions'
//import { removeEntry } from '../utils/api'
import { NavigationActions } from 'react-navigation'

const screenWidth = Dimensions.get('window').width;

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
    const { navigation } = this.props
    const { cards } = navigation.state.params
    return (!showAnswer ? 
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 20 }}>
            {cards[this.state.cardSequenceId].question}
          </Text>
          <TextButton style={{padding: 10}} onPress={this.onToggleAnswer}>
            Show Answer
          </TextButton> 
        </View>
      :
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 20, color: gray }}>
            {cards[this.state.cardSequenceId].answer}
          </Text>
          <TextButton style={{padding: 10}} onPress={this.onToggleAnswer}>
            Show Question
          </TextButton> 
        </View>
    )
  }

  showResult() {
    const { navigation } = this.props
    const { cards } = navigation.state.params
    const correctionPercent = this.state.correctCardsCount / cards.length
    return (
      <View style={{ paddingBottom: 50 }}>
        <Text style={{ fontSize: 20 }}>
          {correctionPercent >= 0.8 ? 
            `Excellent! You answered ${this.state.correctCardsCount} out of ${cards.length} correctly; go back and study another deck.`
          :
            `Hmmm! You answered only ${this.state.correctCardsCount} out of ${cards.length} correctly; do you want to restart?`
          }
        </Text>
      </View>
    )
  }
  
  onCorrect = () => {
    let {correctCardsCount, cardSequenceId} = this.state
    this.setState({correctCardsCount: ++correctCardsCount, cardSequenceId: ++cardSequenceId})
    
  }

  onIncorrect = () => {
    let {cardSequenceId} = this.state
    this.setState({cardSequenceId: ++cardSequenceId})
  }

  onRestart = () => {
    this.setState({cardSequenceId: 0,
      correctCardsCount:0,})
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { navigation } = this.props
    const { cards } = navigation.state.params
    const { cardSequenceId, showAnswer} = this.state
    return (
    <View style={styles.container}>
      <View >
        <Text>Remaining: {cardSequenceId === cards.length ? 0 : cards.length - cardSequenceId + 1} / {cards.length}</Text> 
      </View>
      {cards.length !== (cardSequenceId) ? 
        <View style={styles.container}>
          {this.toggleQA(showAnswer)}
          <View style={{ paddingBottom: 20 }}>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={this.onCorrect}
            >
              <Text style={{color:white}}>Correct</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <TouchableOpacity
              style={styles.redButton}
              onPress={this.onIncorrect}
            >
              <Text style={{color:white}}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.container}>
          {this.showResult()}
          <View style={{ paddingBottom: 20 }}>
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={this.onRestart}
            >
              <Text style={{color:white}}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <TouchableOpacity
              style={styles.blackButton}
              onPress={this.toHome}
            >
              <Text style={{color:white}}>Back to Deck</Text>
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
    justifyContent: 'center',
    alignItems:'center',
  },
  greenButton: {
    width: screenWidth/2,
    alignItems: 'center',
    backgroundColor: green,
    padding: 10
  },
  redButton: {
    width: screenWidth/2,
    alignItems: 'center',
    backgroundColor: red,
    padding: 10
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
)(Card)