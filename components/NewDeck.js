import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput,TouchableOpacity, Dimensions } from 'react-native'
import { white, purple } from '../utils/colors'
import TextButton from './TextButton'
import { createDeck } from '../utils/api'
import {NavigationActions} from 'react-navigation'

const screenWidth = Dimensions.get('window').width;

class NewDeck extends Component {
  state = {
    text: ''
  }
  
  render() {
    return (
    <View style={styles.container}>
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
              createDeck(this.state.text)
              .then(()=>{
              this.setState({text:''})
              //this.props.navigation.state.params.onNavigateBack()
              this.props.navigation.dispatch(NavigationActions.back())
              })
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
  inputText: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
  }
})

export default NewDeck