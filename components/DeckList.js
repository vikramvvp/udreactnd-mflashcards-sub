import _ from 'lodash'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, AsyncStorage, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getDecklist } from '../actions'
import { GET_DECKLIST } from '../actions/types'
import { fetchDecksList, setDummyData, initialData } from '../utils/api'
import { white, black, red } from '../utils/colors'
import { AppLoading } from 'expo'
import ListRow from './ListRow'
import TextButton from './TextButton'

class DeckList extends React.Component {
  
  state = { ready: false }

  componentDidMount() {
    fetchDecksList()
      .then(results => {
        if (results === null) {
          setDummyData()
          return initialData
        }
        else {
          return JSON.parse(results)
        }
      })
      .then(results => {
        // convert object to array with _.values and add id inside objects
        this.props.onGetDecks(_.orderBy(_.values(_.mapValues(results, (value, key) => { value.id = key; return value; })), ['id'], ['asc']))
      })
      .then(() => {
        this.setState({ ready: true })
      })
      .catch(reason => { console.log('failure in DeckList-CDM', reason) })
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (deckId) => {
    this.props.navigation.navigate(
      'DeckInfo',
      { deckId }
    )
  };

  _renderItem = ({item}) => (
    <ListRow
      id={item.id}
      itemInfo={item}
      onPressItem={this._onPressItem}
    />
  );

  render() {
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }
    return (
      <FlatList
        data={this.props.decksList}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    decksList: state.decksList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDecks: results => { dispatch(getDecklist(results)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)