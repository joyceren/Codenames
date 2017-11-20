import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const testArr = [
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

const cards = function (state = testArr, action) {
  switch(action.type){
    case "FLIP_CARD":
      return state.map( word =>
        word.word===action.card ? {word:word.word, color:word.color, flipped: true} : word
      )
    default:
      return state
  }
}

const spyMaster = function (state = false, action) {
  switch(action.type){
    case "CHANGE_VIEW":
      return !state
    default:
      return state
  }
}

const currentUser = function (state={}, actions) {
  switch(action.type){
    case "LOG_IN":
      return action.user
    default:
      return state
  }
}

const reducer = combineReducers({
  cards,
  spyMaster,
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
