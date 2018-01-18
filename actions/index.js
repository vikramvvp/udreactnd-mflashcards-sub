import * as types from './types'
import { fetchDecksList, setDummyData, initialData, createDeck, addCard } from '../utils/api'

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
    const deckInfo = addCard(deckId, question, answer)
    if (deckInfo) {
      dispatch({type: types.GET_DECKINFO, payload: deckInfo})
    }
    else {
      console.log('Error in getting updated deck info')
    }
  }
}
