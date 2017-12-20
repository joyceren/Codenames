import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

/* ------------------ INITIAL STATE ----------------- */

const initialState = {
  cards:[],
  turn: {team:''},
  chat: []
}

/* ------------------ CARDS REDUCER ----------------- */


const START_GAME = "START_GAME"
const SELECT_CARD = "SELECT_CARD"
const REVEAL_CARD = "REVEAL_CARD"

const setUpCards = cards => ({type:SETUP_CARDS, cards})


const cards = (state = initialState.cards, action) => {
  if (action.type === START_GAME)
      return action.cards

  if (action.type === REVEAL_CARD) {
    const newCards = [...state]
    const {index, color} = action
    const card = state[index]
    newCards[index] = {...card,
      color,
      flipped: true,
    }
    return newCards
  }

  return state
}


/* ------------------ TURN REDUCER ----------------- */

const END_TURN = "END_TURN"
const SET_HINT = "SET_HINT"
//also selectCard from cards reducers
const endTurn = () => ({type:END_TURN})
const startGame = firstTeam => ({type:START_GAME, firstTeam})

//if it were red's turn, with the clue "country" and 5 guesses
// then turn with look like => {guesses:5, hint:"country", team:"red"}

const turn = (state=initialState.turn, action) => {
  switch(action.type){
    case START_GAME:
      return {team: action.firstTeam}

    case END_TURN:
      return {team:state.team==="red" ? "blue":"red"}

    case SELECT_CARD:
      if(state.guesses-1===0) {
        return {team: state.team==="red" ? "blue":"red"}
      }
      return {guesses: state.guesses-1, hint:state.hint, team:state.team}

    case REVEAL_CARD:
      if(state.team!==action.color) {
        return {team: state.team==="red" ? "blue":"red"}
      }
      return state

    case SET_HINT:
      return {guesses:action.guesses, hint:action.hint, team:state.team}

    default:
      return state
  }
}

const chat = (state = initialState.chat, action) => {
  if (action.type === "SEND_MESSAGE"){
    const messages = [action.message, ...state]
    if (messages.length > 20) messages.shift()
    return messages
  }
  else return state
}


const reducer = combineReducers({
  cards,
  turn,
  chat
})

export default reducer

export { setUpCards, selectCard, startGame, setPlayer, leaveGame }
