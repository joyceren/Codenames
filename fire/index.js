import config from './config'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

export default firebase

export const google = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

// Auto anonymous signin:
//
// auth.onAuthStateChanged(user => user || auth.signInAnonymously())

export const db = firebase.firestore()

export const gameById = id => db.collection('games').doc(id)
export const joinGame = gameId => gameById(gameId).update({
  [`players.${auth.currentUser.uid}`]: 'player',
})

export class Game {
  static get collection() {
    return db.collection('games')
  }

  static byId(id) {
    return new Game(Game.collection.doc(id))
  }

  static create() {
    return Game.collection.doc()
  }

  constructor(ref) {
    this.ref = ref
  }

  join() {
    return this.ref.update({
      [`players.${auth.currentUser.uid}`]: 'player',
    })
  }

  get journal() {
    return this.ref.collection('journal')
  }
}

// export const newGame = () => db.collection('games').doc().set()
// => some function that gets random cards and makes a new game board
