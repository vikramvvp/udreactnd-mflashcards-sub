import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecklist  } from '../actions'
//import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchDecksList } from '../utils/api'
//import UdaciFitnessCalendar from 'udacifitness-calendar'
import { white, black } from '../utils/colors'
import { AppLoading } from 'expo'

class DeckList extends Component {
  state = {
    ready: true,
  }
  componentDidMount() {
    const { dispatch } = this.props
    //console.log('cdm before this.props', this.props)
    dispatch(getDecklist())
    // fetchDecksList()
    //   .then((decks) => {
    //     console.log('fetch decks', decks)
    //     return dispatch(getDecklist(decks))})
    //   .then(({deckList}) => {console.log('then fetch', decks)})
    //   .then(() => this.setState(() => ({ ready: true })))
    //   .catch((err) => {console.log('err',err)})

    //console.log('cdm after this.props', this.props)
  }


  render() {
    const { decks } = this.props
    const { ready } = this.state
    console.log('keys', Object.keys(decks))

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.item}>
        {Object.keys(decks).length > 0 
          ? Object.keys(decks).map((deck) => {
            return (
              <View key={decks[deck].title} >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(
                    'DeckInfo',
                    { deckName: decks[deck].title }
                  )}
                >
                  <Text style={styles.noDataText}>
                    {decks[deck].title}
                  </Text>
                  <Text style={styles.noDataText}>
                  {decks[deck].questions.length} cards
          </Text>
                </TouchableOpacity>
              </View>
            )
          })
          :
          <View style={styles.item}>
            <Text style={styles.noDataText}>
              There are no decks. Create new deck.
        </Text>
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    color: black,
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})


function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)