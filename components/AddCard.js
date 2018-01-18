import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
//import MetricCard from './MetricCard'
import { white, purple } from '../utils/colors'
import TextButton from './TextButton'
import { insertCard } from '../actions'
//import { removeEntry } from '../utils/api'

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
    dispatch(insertCard(this.state.question, this.state.answer))
    this.setState({text:''})
    const { goBack } = this.props
    goBack()
    //this.props.navigation.dispatch(NavigationActions.back({key: 'DeckInfo'}))
  }
  
  render() {
    return (
    <View>
      <View style={styles.inputContainer}>
        <Text>Question: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(e) => this.setState({question: e.target.value})}
          value={this.state.question}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Answer: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(e) => this.setState({answer: e.target.value})}
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
    
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AddCard)