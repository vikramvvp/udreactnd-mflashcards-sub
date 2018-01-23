import * as types from '../actions/types'

function decks (state = {}, action) {
  switch (action.type) {
    case types.GET_DECKLIST :
      return {
        ...state,
        decksList: action.payload,
      }
    case types.GET_DECKINFO :
      return {
        ...state,
        deckInfo: action.payload,
      }
    default :
      return state
  }
}

export default decks