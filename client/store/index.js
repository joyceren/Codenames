import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const cards = function (state = [], action) {
  const cards = [...state]
  switch(action.type){

    case "SETUP_CARDS":
      return action.cards

    case 'REVEAL':
      if (cards[action.index].color) return state
      cards[action.index].color = action.color
      return cards

    case 'PICK':
      if (cards[action.index].color) return state
      cards[action.index].color = action.color
      return cards

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
})

export default reducer