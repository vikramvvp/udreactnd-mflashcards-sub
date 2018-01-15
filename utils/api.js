import { AsyncStorage } from 'react-native'
export const VPFLASHCARDS_STORAGE_KEY = 'vikram:flashcards'

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function setDummyData() {
  
  AsyncStorage.setItem(VPFLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
  return initialData
}

export function fetchDecksList () {
  return initialData
  // return AsyncStorage.getItem(VPFLASHCARDS_STORAGE_KEY)
  // .then((results) => {
  //   console.log('results',results)
  //   return results === null
  //   ? initialData
  //   : JSON.parse(results)
  // })

  // AsyncStorage.setItem(VPFLASHCARDS_STORAGE_KEY, JSON.stringify(initialData)).then(() => {
  // return AsyncStorage.getItem(VPFLASHCARDS_STORAGE_KEY)
  //   .then((results) => {
  //     console.log('results',results)
  //     const data = JSON.parse(results)
  //     return data
  //   })
  // })
}

export function createDeck (deckName) {
  return AsyncStorage.mergeItem(VPFLASHCARDS_STORAGE_KEY, JSON.stringify({
    [deckName]: {}
  }))
}

export function removeDeck (deckName) {
  return AsyncStorage.getItem(VPFLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckName] = undefined
      delete data[deckName]
      AsyncStorage.setItem(VPFLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}