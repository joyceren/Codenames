import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const cards = function (state = [], action) {
  switch(action.type){
    case "FLIP_CARD":
      return state.map( word =>
        word.id===action.card ? {id:word.id, word:word.word, color:word.color, flipped: true} : word
      )
    case "SETUP_CARDS":
      return action.cards

    case 'REVEAL':
      if (cards[action.index].color)
        return state
      const cards = [...state]
      cards[action.index].color = action.color
      return cards

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
      return state

  }
}

const reducer = combineReducers({
  cards,
  spyMaster,
  currentUser,
  turn,
})

export default reducer