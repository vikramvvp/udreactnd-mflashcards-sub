import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { white, purple } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { insertDeck } from '../actions'
import { connect } from 'react-redux'

class NewDeck extends Component {
  state = {
    text: ''
  }
  
  render() {
    return (
    <KeyboardAvoidingView style={styles.container}>
      <View >
        <Text>Deck Name: </Text>
        <TextInput
          maxLength={20}
          style={styles.inputText}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={()=>{
              this.props.onInsert(this.state.text)
              this.setState({text:''})
              this.props.navigation.dispatch(NavigationActions.back())
              
            }}>
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
  inputText: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
  }
})

const mapStateToProps = (state) => {
  return {
    decksList: state.decksList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInsert: (deckName) => {dispatch(insertDeck(deckName))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)