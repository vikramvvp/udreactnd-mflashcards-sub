import * as types from './types'
import { fetchDecksList, setDummyData, initialData, createDeck, addCard } from '../utils/api'
import { AsyncStorage } from './C:/Users/admin/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-native';

export function getDecklist(results) {
  return function (dispatch, getState) {
    dispatch({type: types.GET_DECKLIST, payload: results})
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
        
        dispatch({type: types.GET_DECKINFO, payload: {title: deckName}})
      })
      .catch(reason=>{console.log('failure action-insertDeck',reason)})
  }
}

export function insertCard(deckId, question, answer) {
  return function (dispatch, getState) {
    addCard(deckId, question, answer)
    .then((deckInfo)=>{
    //console.log('insercarddeckInfo',deckInfo)
    if (deckInfo) {
      dispatch({type: types.GET_DECKINFO, payload: deckInfo})
    }
    else {
      console.log('Error in getting updated deck info')
    }
    return deckInfo
  })
  }
}
