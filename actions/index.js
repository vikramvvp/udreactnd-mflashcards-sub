import * as types from './types'
import { fetchDecksList, setDummyData, initialData } from '../utils/api'

export function getDecklist(results) {
  return function (dispatch, getState) {
    dispatch({type: types.GET_DECKLIST, payload: JSON.parse(results)})
  }
}

export function getDeckInfo(deckName) {
  return function (dispatch, getState) {
    fetchDecksList()
    .then((results) => {
      const data = JSON.parse(results)
      dispatch({type: types.GET_DECKINFO, payload: data[deckName]})
    })
    .catch(reason=>{console.log('failure action-getDeckInfo',reason)})
  }
}

