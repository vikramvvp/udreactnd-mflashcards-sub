import _ from 'lodash'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, AsyncStorage, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getDecklist, getDeckInfo, getList } from '../actions'
import { GET_DECKLIST } from '../actions/types'
import { fetchDecksList, setDummyData, initialData } from '../utils/api'
import { white, black, red } from '../utils/colors'
import { AppLoading } from 'expo'
import MyListItem from './MyListItem'
import TextButton from './TextButton'



class DeckList extends React.Component {
  // state = {selected: (new Map())};
  state = { ready: false }

  handleOnNavigateBack = () => {this.setState({ready:false})}

  componentDidMount() {
    //console.log('cdm')
    fetchDecksList()
      .then(results => {
        //console.log('results', results)
        if (results === null) {
          setDummyData()
          return initialData
        }
        else {
          return JSON.parse(results)
        }
      })
      .then(results => {
        //console.log('CDM results', results)
        // convert object to array with _.values and add id inside objects
        this.props.onGetDecks(_.orderBy(_.values(_.mapValues(results, (value, key) => { value.id = key; return value; })), ['id'], ['asc']))
      })
      .then(() => {
        this.setState({ ready: true })
      })
      .catch(reason => { console.log('failure in DeckList-CDM', reason) })
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (itemInfo,backHandler) => {
    this.props.navigation.navigate(
      'DeckInfo',
      { deckInfo: itemInfo,
        onNavigateBack: backHandler}
    )
    // updater functions are preferred for transactional updates
    // this.setState((state) => {
    //   // copy the map rather than modifying state.
    //   const selected = new Map(state.selected);
    //   selected.set(id, !selected.get(id)); // toggle
    //   return {selected};
    // });
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      itemInfo={item}
      onPressItem={this._onPressItem}
      backHandler={this.handleOnNavigateBack}
      //selected={!!this.state.selected.get(item.id)}
    />
  );

  render() {
    //console.log('propos', this.props.decksList)
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