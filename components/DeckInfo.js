import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native'
import Card from './Card'
import AddCard from './AddCard'
import { white, black, gray } from '../utils/colors'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import {getDeckInfo, returnDeckInfo} from '../actions'
import { fetchDecksList } from '../utils/api'
import * as types from '../actions/types'

const screenWidth = Dimensions.get('window').width;

class DeckInfo extends Component {
  state = {
    ready: false
  }
  
  componentDidMount() {
    const { navigation, dispatch } = this.props
    const { deckInfo } = navigation.state.params
    

    // if (deckInfo) {
    //   this.setState({ready: true})
    // }
    fetchDecksList()
    .then((results) => {
      const data = JSON.parse(results)
      this.props.onReturnDeckInfo(data[deckInfo.id])
    })
    .then(()=>{this.setState({ready: true})})
    .catch(reason=>{console.log('failure action-getDeckInfo',reason)})
    //this.props.onGetInfo(deckInfo.id)
    
  }

  onStartQuiz = () => {
    const { navigation } = this.props
    const { deckInfo } = navigation.state.params
    this.props.navigation.navigate(
      'Card',
      { cards: deckInfo.questions }
    )
  }

  onAddCard = () => {
    const { navigation } = this.props
    const { deckInfo } = navigation.state.params
    this.props.navigation.navigate(
      'AddCard',
      { deckId: deckInfo.id }
    )
  }

  render() {
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }
    else {

    const { navigation, deckInfo } = this.props
    // let { deckInfo } = navigation.state.params
    // if (!deckInfo) {
    //   deckInfo = this.props.deckInfo
    // }
    const cards = deckInfo.questions
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 20 }}>
            {deckInfo.title}
          </Text>
          <Text style={{ fontSize: 16, color: gray }}>
            {cards ? cards.length : '0'} cards
          </Text>
        </View>
        <View style={{ paddingBottom: 20  }}>
          <TouchableOpacity
            style={styles.whiteButton}
            onPress={this.onAddCard}
          >
            <Text style={{color:white}}>Create New Question</Text>
          </TouchableOpacity>
        </View>
        {(cards && cards.length > 0) && 
          (<View style={{ paddingBottom: 20 }}>
            <TouchableOpacity
              style={styles.blackButton}
              onPress={this.onStartQuiz}
            >
              <Text style={{color:white}}>Start a Quiz</Text>
            </TouchableOpacity>
          </View>)}
      </KeyboardAvoidingView>
    )
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems:'center',
    padding: 15,
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

const mapStateToProps = (state) => {
  return {
    deckInfo: state.deckInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetInfo: (deckId) => {dispatch(getDeckInfo(deckId))},
    onReturnDeckInfo: (deckInfo) => {dispatch(returnDeckInfo(deckInfo))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckInfo)