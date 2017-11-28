const SETUPCARDS = "SETUP_CARDS"
const SELECTCARD = "SELECT_CARDS"

export const setUpCards = cards => ({type:SETUPCARDS, cards})
const selectCards = card => ({type:SELECTCARD, card})


export const cards = (state = [], action) => {
  switch(action.type){
    case "SETUP_CARDS":
      return action.cards
    case "SELECT_CARD":
      return state.
    default:
      return state
  }
}

export default cards
