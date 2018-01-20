import _ from 'lodash'
import * as types from './types'
import { fetchDecksList, setDummyData, initialData, createDeck, addCard } from '../utils/api'
import { AsyncStorage } from 'react-native';

export function getDecklist(results) {
  return function (dispatch, getState) {
    dispatch({type: types.GET_DECKLIST, payload: results})
  }
}

export function returnDeckInfo(deckInfo) {
  return function (dispatch, getState) {
    dispatch({type: types.GET_DECKINFO, payload: deckInfo})
  }
}

export function getDeckInfo(deckId) {
  return function (dispatch, getState) {
    fetchDecksList()
    .then((results) => {
      const data = JSON.parse(results)
      dispatch({type: types.GET_DECKINFO, payload: data[deckId]})
    })
    .catch(reason=>{console.log('failure action-getDeckInfo',reason)})
  }
}

export function insertDeck(deckName) {
  return function (dispatch, getState) {
    createDeck(deckName)
      .then(()=>{
        return fetchDecksList()
        .then(results => {
          return dispatch({
              type: types.GET_DECKLIST, 
              payload: _.orderBy(_.values(_.mapValues(JSON.parse(results), (value, key) => { value.id = key; return value; })), ['id'], ['asc'])})
        })
      })
      .catch(reason=>{console.log('failure action-insertDeck',reason)})
  }
}

export function insertCard(deckId, question, answer) {
  return function (dispatch, getState) {
    addCard(deckId, question, answer)
    .then(()=>{
      return fetchDecksList()
      .then(results => {
        data = JSON.parse(results)
        dispatch({
          type: types.GET_DECKLIST, 
          payload: _.orderBy(_.values(_.mapValues(data, (value, key) => { value.id = key; return value; })), ['id'], ['asc'])})
        //dispatch({type: types.GET_DECKINFO, payload: data[deckId]})
        
      })
      
      
    })

    .catch(reason=>{console.log('failure action-insertCard',reason)})
  }
}
  //   .then((deckInfo)=>{
  //   //console.log('insercarddeckInfo',deckInfo)
  //   if (deckInfo) {
  //     dispatch({type: types.GET_DECKINFO, payload: deckInfo})
  //   }
  //   else {
  //     console.log('Error in getting updated deck info')
  //   }
  //   return deckInfo
  // })
  
