import * as types from '../actions/types'

function decks (state = {}, action) {
  switch (action.type) {
    case types.GET_DECKLIST :
      //console.log('action', action)
      return {
        ...state,
        ...action.payload,
      }
    case types.GET_DECKINFO :
      return {
        ...state,
        ...action.deckInfo
      }
    default :
      return state
  }
}

export default decks