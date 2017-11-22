import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const cards = function (state = {}, action) {
  switch(action.type){
    case "FLIP_CARD":
      return state.map( word =>
        word.id===action.card ? {id:word.id, word:word.word, color:word.color, flipped: true} : word
      )
    case "SET_CARDS":
      return action.cards
    default:
      return state
  }
}

const spyMaster = function (state=false, action) {
  switch(action.type){
    case "CHANGE_VIEW":
      return !state
    default:
      return state
  }
}

const currentUser = function (state={}, action) {
  switch(action.type){
    case "SET_USER":
      return action.user
    default:
      return state
  }
}

const turn = function (state="", action) {
  switch(action.type){
    case "SET_TURN":
      return action.turn
    case "CHANGE_TURN":
      return state==="red" ? "blue":"red"
    default:
      console.log("default")
      return state

  }
}

const reducer = combineReducers({
  cards,
  spyMaster,
  currentUser,
  turn,
})

const FIRESTORE_ATTACH = 'FIRESTORE_ATTACH'
const firestoreAttach = ref => ({
  type: FIRESTORE_ATTACH, ref
})

const firestoreMiddleware = store => dispatch => {
  let unsubscribe = null

  return action => {
    if (action.type === FIRESTORE_ATTACH) {
      unsubscribe && unsubscribe()

      unsubscribe = action.ref.orderBy('ts').onSnapshot(snap => {
        snap.docChanges.forEach(change =>
          change.type === 'added' && dispatch(change.doc.data())
        )
      })
    }


  }
}

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  firestoreMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
