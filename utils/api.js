import { AsyncStorage } from 'react-native'
export const VPFLASHCARDS_STORAGE_KEY = 'vikram:flashcards'

export function setDummyData() {
  AsyncStorage.setItem(VPFLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
}

export function fetchDecksList() {
  console.log('fetch')
  return AsyncStorage.getItem(VPFLASHCARDS_STORAGE_KEY)
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

export const initialData = {
  React: {
    title: 'React',
    questions: [
      {question: 'What is React?',answer: 'A library for managing user interfaces'},
      {question: 'Where do you make Ajax requests in React?',answer: 'The componentDidMount lifecycle event'}
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {question: 'What is a closure?',answer: 'The combination of a function and the lexical environment within which that function was declared.'}
    ]
  },
  Git: {
    title: 'Git',
    questions:[
      {question:'What is Git?', answer:'Git is distributed version control system'},
      {question:'How does Git differ from other VCS (like SVN or Perforce)?', answer:'Every Git repository is completely copied on local system. '},
      {question:'How does Git maintain integrity?', answer:'Everything in Git is check-summed before it is stored and is then referred to by that checksum.'},
      {question:'How is checksum done in Git?', answer:'Check-summing is done using SHA-1 hash - a 40-character string composed of hexadecimal characters (0–9 and a–f).'}
    ]
  },
  Security: {
    title:'Security',
    questions:[
      {question:'What is hashing in DB?', answer:'Method of sorting and indexing data using keys commonly created by complex formulas. '},
      {question:'What is hashing in security?', answer:'Method of taking data, encrypting it, and creating unpredictable, irreversible output. '},
      {question:'What are examples of hashing algorithms?', answer:'MD2, MD5, SHA, and SHA-1 are examples of hashing algorithms.'},
      {question:'What is hash function?', answer:'Function which helps us in generating such kind of key-value mapping is known as Hash Function. '},
      {question:'What is hash table?', answer:'Hash Table a.k.a Hash Map is a data structure which uses hash function to generate key corresponding to the associated value.'}
    ]
  },
  NodeJS: {
    title:'NodeJS',
    questions:[
      {question:'What is Node.js?', answer:'open-source, cross-platform JavaScript runtime environment for developing a diverse variety of server tools and applications'},
      {question:'How to decide when to use Node.js?', answer:'Event driven applications <br> real-time applications - online games, collaboration tools, chat rooms <br> applications that maintain a persistent connection from the browser back to the server <br> reusing a lot of code across the client/server gap'},
      {question:'What is event loop?', answer:'mechanism which allows you to specify what happens when a particular event occurs <br> an entity that handles and processes external events and converts them into callback invocations'},
      {question:'What is callback function?', answer:'function that is passed to another function (let’s call it “otherFunction”) as a parameter, and the callback function is called (or executed) inside the otherFunction'},
    ]
  },
  ES6:{
    title: 'ES6',
    questions:[
      {question:'What is implicit return in fat arrow function?', answer:'Single experession written after arrow without "return" word with arrow function is implicit return.'},
      {question:'Why does this lose receiver when class method is assigned to other method?', answer:'Because class bodies are implicitly in strict mode. Workaround: use bind method within class body or outside, use arrow function to declare method'},
      {question:'How to use destructuring with arrays?', answer:'we can use [item0, item1,…rest] = array instead of array[0], array[1]'},
      {question:'How to define class?', answer:'class myclass { constructor(options) {this.prop = options.prop} method() {//do some}}'},
      {question:'How to define subclass?', answer:'class subclass extends myclass { constructor(options) {super(options); this.prop = options.prop} method() {//do some}}'},
    ]
  },
  GraphQL: {
    title: 'GraphQL',
    questions:[
      {question:'What is GraphQL', answer:'its is query language specification'}
    ]
  },
  SQLServer: {
    title: 'SQLServer',
    questions:[
      {question:'What is SQLServer', answer:'its an RDBMS by Microsoft'}
    ]
  },
  PostgreSQL: {
    title: 'PostgreSQL',
    questions:[
      {question:'What is PostgreSQL', answer:'its an open source RDBMS'}
    ]
  },
  PHP: {
    title: 'PHP',
    questions:[
      {question:'What is PHP', answer:'its an open source language for web development'}
    ]
  }
}