import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { white, purple } from '../utils/colors'
import TextButton from './TextButton'
import { addCard } from '../utils/api'
import { insertCard, getDeckInfo } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
 
  render() {
    const { navigation } = this.props
    const { deckId } = navigation.state.params
    return (
    <View style={styles.container}>
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
          onPress={()=>{
            this.props.onInsert(deckId, this.state.question, this.state.answer)
            this.setState({question: '', answer: ''})
            navigation.dispatch(NavigationActions.back())
          }}>
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