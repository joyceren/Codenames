// {endTurn, generateColors, shuffleHelper, randomWord, createCards, updateCardsRemaining, updateGuessesAllowed, whoGoesFirst}

import wordlist from '../wordlist'

export function whoGoesFirst() {
	return (Math.floor(Math.random() * 2) == 0) ? 'blue' : 'red';
	// changed this to just be "red" and "blue" because its easier to compare that way.
}

function generateColors(startingColor) {
  let colors = []
  if (startingColor === 'blueTeam') {
    colors = ['black', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red','blue' , 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'white', 'white', 'white', 'white', 'white', 'white']
  } else {
    colors = ['black', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'white', 'white', 'white', 'white', 'white', 'white']
  }
  return shuffleHelper(colors)
}

function shuffleHelper(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const randomWord = () => wordlist[Math.floor(Math.random()*400)]

const makeWords = () => shuffleHelper(wordlist).slice(0, 25)

export function createCards(startingColor) {
	const colors = generateColors(startingColor)
	const words = makeWords()
  const cards = []
  for (let i=0; i<25; i++){
    cards.push({word:words[i], color:colors[i]})
	}
  return cards
}

export const updateCardsRemaining = function(cardColor, blueRemainingCards, redRemainingCards, activeTeam) {
  let updatedCardsRemaining = {}
  if (cardColor === 'blue') {
    updatedCardsRemaining = {
      blueTeamNumCardsLeft: blueRemainingCards - 1, redTeamNumCardsLeft: redRemainingCards
    }
  } else if (cardColor === 'red') {
    updatedCardsRemaining = {
      blueTeamNumCardsLeft: blueRemainingCards, redTeamNumCardsLeft: redRemainingCards - 1
    }
  } else if (cardColor === 'black') {
    if (activeTeam === 'red') {
      updatedCardsRemaining = {
        blueTeamNumCardsLeft: 0, redTeamNumCardsLeft: redRemainingCards
      }
    } else {
      updatedCardsRemaining = {
        blueTeamNumCardsLeft: blueRemainingCards, redTeamNumCardsLeft: 0
      }
    }
  }

  return updatedCardsRemaining
}

const updateGuessesAllowed = function(cardColor, displayHint, activeTeam) {
  let newNumGuessesAllowed = 0
  if (cardColor === activeTeam.slice(0, -4)) {
    newNumGuessesAllowed = displayHint.numOfWordGuesses - 1
  } else {
    newNumGuessesAllowed = 0
  }
  return {hintToDisplay: displayHint.hintToDisplay, numOfWordGuesses: newNumGuessesAllowed}
}


export const endTurn = function(numOfWordGuesses, activeTeam) {
  let newTeam = activeTeam
  if (numOfWordGuesses === 0) {
    if (activeTeam === 'red') {
      newTeam = 'blue'
    } else {
      newTeam = 'red'
    }
  }
  return newTeam
}



//at some point, we will want to do export * from './gameLogic.js'   mebbe when there are fewer comments
