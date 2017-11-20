import config from './config'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp(config)

export default firebase

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const db = firebase.firestore()

export const newGame = () => db.collection('games').doc().set({
  cards:[
    {word: "butterfly", color: "blue", flipped: false},
    {word: "lamp", color: "blue", flipped: false},
    {word: "Germany", color: "blue", flipped: false},
    {word: "lightning", color: "blue", flipped: false},
    {word: "ladder", color: "blue", flipped: false},
    {word: "blanket", color: "blue", flipped: false},
    {word: "flag", color: "blue", flipped: false},
    {word: "grass", color: "blue", flipped: false},

    {word: "needle", color: "red", flipped: false},
    {word: "clock", color: "red", flipped: false},
    {word: "basket", color: "red", flipped: false},
    {word: "medicine", color: "red", flipped: false},
    {word: "bottle", color: "red", flipped: false},
    {word: "cabinet", color: "red", flipped: false},
    {word: "plane", color: "red", flipped: false},
    {word: "brick", color: "red", flipped: false},

    {word: "television", color: "white", flipped: false},
    {word: "table", color: "white", flipped: false},
    {word: "squirrel", color: "white", flipped: false},
    {word: "xylophone", color: "white", flipped: false},
    {word: "orchid", color: "white", flipped: false},
    {word: "opal", color: "white", flipped: false},
    {word: "chair", color: "white", flipped: false},
    {word: "pillow", color: "white", flipped: false},
    {word: "Indiana", color: "black", flipped: false}
  ]
})
