import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput,TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
//import MetricCard from './MetricCard'
import { white, purple } from '../utils/colors'
import TextButton from './TextButton'
import { insertDeck } from '../actions'
import {NavigationActions} from 'react-navigation'
//import { removeEntry } from '../utils/api'

const screenWidth = Dimensions.get('window').width;

class NewDeck extends Component {
  state = {
    text: ''
  }
  reset = () => {
    const { goBack } = this.props
    goBack()
  }
  // onSubmit = () => {
  //   const { goBack, dispatch } = this.props
  //   dispatch(insertDeck(this.state.text))
  //   this.setState({text:''})
  //   //this.props.navigation.dispatch(NavigationActions.back({key: 'DeckList'}))
  //   goBack()
  // }
  
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
              this.props.onSubmit(this.state.text)
              this.setState({text:''})
              //this.props.goBack()
              console.log('navstate',this.props.navigation)
              this.props.navigation.state.params.onNavigateBack()
              this.props.navigation.dispatch(NavigationActions.back())
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
    //width:screenWidth/2
  }
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
    onSubmit: (deckName) => {
      dispatch(insertDeck(deckName))
      
      //this.props.navigation.dispatch(NavigationActions.back({key: 'DeckList'}))
      //goBack()
    },
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(NewDeck)