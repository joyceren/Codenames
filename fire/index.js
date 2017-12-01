import config from './config'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

export default firebase

export const google = new firebase.auth.GoogleAuthProvider();
export const email = new firebase.auth.EmailAuthProvider()
export const auth = firebase.auth();


// Auto anonymous signin:
//
// auth.onAuthStateChanged(user => user || auth.signInAnonymously())

export const db = firebase.firestore()

const gameRef = db.collection("games")

export const gameById = id => db.collection('games').doc(id)

export const joinGame = gameId => gameById(gameId).update({
  [`players.${auth.currentUser.uid}`]: {email: auth.currentUser.email, role:'player'},
})

export const makeNewGame = (name, isPrivate, history) => {
  const status = isPrivate ? "pending-private" : "pending"
  const players = {}
  if(name) gameRef.doc(name).set({status, players}).then(({id}) => history.push('/'+id))
  else gameRef.add({status, players}).then(({id}) => history.push('/'+id))
}

export const journal = ref => ref.collection("journal")
