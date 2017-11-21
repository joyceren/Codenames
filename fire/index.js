import config from './config'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

export default firebase

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const db = firebase.firestore()

// export const newGame = () => db.collection('games').doc().set()
// => some function that gets random cards and makes a new game board
