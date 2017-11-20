import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

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
