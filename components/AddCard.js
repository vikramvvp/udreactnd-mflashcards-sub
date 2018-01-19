import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
//import MetricCard from './MetricCard'
import { white, purple } from '../utils/colors'
import TextButton from './TextButton'
import { insertCard } from '../actions'
import { addCard } from '../utils/api'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  reset = () => {
    const { goBack } = this.props
    goBack()
  }
  onSubmit = () => {
    const { goBack,onInsertCard,navigation } = this.props
    const {deckId} = navigation.state.params
    addCard(deckId, this.state.question, this.state.answer)
    .then((deckInfo)=>{
        this.setState({question: '', answer: ''})
        console.log('qlength', deckInfo.questions.length);
        navigation.dispatch(NavigationActions.navigate({routeName:'DeckInfo', params: {deckInfo}}))
      })
      .catch(reason=>{console.log('failure action-insertDeck',reason)})

    //const deckInfo = onInsertCard(deckId,this.state.question, this.state.answer)
    // console.log('qlength', deckInfo.questions.length);
    // this.setState({question: '', answer: ''})
    
    // goBack(deckInfo)
    //this.props.navigation.dispatch(NavigationActions.back({key: 'DeckInfo'}))
  }
  
  render() {
    return (
    <View style={styles.container}>
      <View >
        <Text>Question: </Text>
        <TextInput
          maxLength={100}
          multiline = {true}
          numberOfLines = {4}
          style={{borderColor: 'gray', borderWidth: 1, height:120}}
          onChangeText={(text) => this.setState({question: text})}
          value={this.state.question}
        />
      </View>
      <View>
        <Text>Answer: </Text>
        <TextInput
          maxLength={100}
          multiline = {true}
          numberOfLines = {4}
          style={{borderColor: 'gray', borderWidth: 1, height:120}}
          onChangeText={(text) => this.setState({answer: text})}
          value={this.state.answer}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.onSubmit}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
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
    onInsertCard: (deckId,q,a) => {dispatch(insertCard(deckId,q,a))},
    goBack: (deckInfo) => navigation.navigate('DeckInfo', {deckInfo}),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AddCard)