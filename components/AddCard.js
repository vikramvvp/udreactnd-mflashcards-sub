import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { white, purple } from '../utils/colors'
import { insertCard, getDeckInfo } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  onSubmit = (deckId) => {
    if (this.state.question.trim() === '' || this.state.answer.trim() === '') {
      Alert.alert(
        'Invalid Inputs!',
        'Question or Answer cannot be blank! Please revise inputs.',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      )
    }
    else {
      this.props.onInsert(deckId, this.state.question, this.state.answer)
      this.setState({question: '', answer: ''})
      this.props.navigation.dispatch(NavigationActions.back())
    }
  }
 
  render() {
    const { navigation } = this.props
    const { deckId } = navigation.state.params
    return (
    <KeyboardAvoidingView style={styles.container}>
      <View >
        <Text>Question: </Text>
        <TextInput
          maxLength={100}
          multiline = {true}
          numberOfLines = {2}
          style={{borderColor: 'gray', borderWidth: 1, height:60}}
          onChangeText={(text) => this.setState({question: text})}
          value={this.state.question}
        />
      </View>
      <View>
        <Text>Answer: </Text>
        <TextInput
          maxLength={100}
          multiline = {true}
          numberOfLines = {2}
          style={{borderColor: 'gray', borderWidth: 1, height:60}}
          onChangeText={(text) => this.setState({answer: text})}
          value={this.state.answer}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={()=>{this.onSubmit(deckId)}}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
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

const mapStateToProps = (state) => {
  return {
    decksList: state.decksList,
    deckInfo: state.deckInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInsert: (deckId, q, a) => {dispatch(insertCard(deckId, q, a))},
    onGetInfo: (deckId) => {dispatch(getDeckInfo(deckId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)