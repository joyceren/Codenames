import config from './config'
import firebase from 'firebase'
import firebaseui from 'firebaseui',
import 'firebase/firestore'

export const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosURL: '/'
}

firebase.intializeApp(config)
export default firebase
export const db = firebase.firestore()

// export const tripById = (id) => db.collection('trips').doc(id)

export const ui = new firebaseui.auth.AuthUI(firebase.auth())
