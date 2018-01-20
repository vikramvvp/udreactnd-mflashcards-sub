import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { white, purple } from '../utils/colors'
import TextButton from './TextButton'
import { addCard } from '../utils/api'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
 
  onSubmit = () => {
    const { navigation } = this.props
    const {deckId} = navigation.state.params
    addCard(deckId, this.state.question, this.state.answer)
    .then((deckInfo)=>{
        this.setState({question: '', answer: ''})
        navigation.dispatch(NavigationActions.navigate({routeName:'DeckInfo', params: {deckInfo}}))
      })
      .catch(reason=>{console.log('failure addcard-onsubmit',reason)})
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

export default AddCard