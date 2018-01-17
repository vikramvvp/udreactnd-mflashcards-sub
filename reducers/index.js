import * as types from '../actions/types'

function decks (state = {}, action) {
  switch (action.type) {
    case types.GET_DECKLIST :
  console.log('action', action)
      return {
        ...state,
        decksList: action.payload,
      }
    case types.GET_DECKINFO :
      //console.log('action', action)
      return {
        ...state,
        deckInfo: action.payload,
      }
    default :
      return state
  }
}

export default decks