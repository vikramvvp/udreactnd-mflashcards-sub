import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { getDecklist, getDeckInfo, getList } from '../actions'
import { GET_DECKLIST } from '../actions/types'
import { fetchDecksList, setDummyData, initialData } from '../utils/api'
import { white, black } from '../utils/colors'
import { AppLoading } from 'expo'
import TextButton from './TextButton'

class DeckList extends Component {
  state = {
    ready: false
  }
  componentDidMount() {
    fetchDecksList()
      .then(results => {
        if (results === null) {
          setDummyData()
          return initialData
        }
        else {
          return results
        }
      })
      .then(results => {
        // console.log('CDM results', results)
        this.props.onGetDecks(results)
      })
      .then(() => {
        this.setState({ ready: true })
      })
      .catch(reason => { console.log('failure in DeckList-CDM', reason) })

    // AsyncStorage.setItem('vikram:flashcards', JSON.stringify(initialData), () => {
    //     AsyncStorage.getItem('vikram:flashcards', (err, result) => {
    //       console.log('result', result);
    //     });
    // });
  }

  onPress = () => { this.props.onGetDeckInfo('React') }

  render() {
    const { decksList, deckInfo } = this.props
    const { ready, selectedDeck } = this.state
    // console.log('render decksList', decksList, 'render decksInfo', deckInfo)

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.item}>
        {decksList && Object.keys(decksList).length > 0
          ? Object.keys(decksList).map((deck) => {
            return (
              <View key={decksList[deck].title} >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate(
                    'DeckInfo',
                    { deckName: decksList[deck].title }
                  )}
                >
                  <Text style={styles.noDataText}>
                    {decksList[deck].title}
                  </Text>
                  <Text style={styles.noDataText}>
                    {decksList[deck].questions.length} cards
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
          </View>
        }
        <View>
          <TextButton style={{ margin: 20 }} onPress={this.onPress}>
            Check AsyncStorage
          </TextButton>
          <Text style={styles.noDataText}>
            {deckInfo ? deckInfo.title : ''}
          </Text>
        </View>
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

const mapStateToProps = (state) => {
  return {
    decksList: state.decksList,
    deckInfo: state.deckInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDecks: results => { dispatch(getDecklist(results)) },
    onGetDeckInfo: deckName => { dispatch(getDeckInfo(deckName)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)