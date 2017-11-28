import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

/* ------------------ INITIAL STATE ----------------- */

const initialState = {
  cards:[],
  turn: {team:''},
  gameStatus: 'pending',
  players: {},
}

/* ------------------ CARDS REDUCER ----------------- */

import cards from "./cards"

const SETUP_CARDS = "SETUP_CARDS"
const SELECT_CARD = "SELECT_CARD"

export const setUpCards = cards => ({type:SETUP_CARDS, cards})
export const selectCard = (cardIndex, cardColor) =>
  ({type:SELECT_CARD, index:cardIndex, color:cardColor})
  // for both the cards reducer and turn reducer


const cards = (state = initialState.cards, action) => {
  switch(action.type){
    case SETUP_CARDS:
      return action.cards

    case SELECT_CARD:
      const {index, color} = action
      const cards = state.cards
      cards[index].color = color
      return cards

    default:
      return state
  }
}


/* ------------------ TURN REDUCER ----------------- */

const START_GAME = "START_GAME"
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
      const team = action.firstTeam
      return {team}

    case END_TURN:
      const team = state.team==="red" ? "blue":"red"
      return {team}

    case SELECT_CARD:
      if(state.guess-1===0 || action.color!==state.team) {
        return {team: state.team==="red" ? "blue":"red"}
      }
      return {guesses: state.guesses--, hint:state.hint, team:state.team}

    case SET_HINT:
      return {guesses:action.guesses, hint:action.hint, team:state.team}

    default:
      return state
  }
}

/* ------------------ ACTIVE TEAM REDUCER ----------------- */

// const activeTeam = (state='', action) => {
//   switch(action.type){
//     case "END_TURN":
//       return state==="red" ? "blue":"red"
//     case "SELECT_CARD":
//       return
//     default:
//       return state
//   }
// }


/* ------------------ GAME STATUS REDUCER ----------------- */

const gameStatus = (state=initialState.gameStatus, action) => {
  switch(action.type){
    case "SET_GAME_STATUS":
      return action.status
    default:
      return state
  }
}

/* ------------------ PLAYERS REDUCER ----------------- */

const players = (state=initialState.players, action) => {
  switch(action.type){
    case "SET_PLAYER":
      const {id, player} = action
      const newPlayers = state
      state[id] = player
      return newPlayers
  }
}

const reducer = combineReducers({
  cards,
  turn,
  gameStatus,
  players,
})

export default reducer
