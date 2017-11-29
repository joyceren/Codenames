// {endTurn, generateColors, shuffleHelper, randomWord, createCards, updateCardsRemaining, updateGuessesAllowed, whoGoesFirst}

//i have to tweak endgame and
// The way this file is sorted is you can search up the issue by the commented line. so game logic for making the board
// can be referenced by copying and pasting "Who should go first? & Making the board" as written below.

//gonna try to do this with as much js and as little firebase as possible lulz
//also...its like 3 in the morning...im not testing jack shit.

//Making the board happens how?

/*
Current Issues with the legend at the moment are that we can't get the board in a random order right now
We need to assign colors randomly, and the words randomly as well.
colors? = no    words? = yes

//Assigning users to roles = player/spy or spymaster

//Who should go first? & Making the board - DONE ISH
	That is decided by the number of red or blue cards in the legend.
	If the number of red cards is equal to 9 then redTeam is first, and vise versa - ternary
	Alternatively, we can decide who goes first, and populate the legend from there...which makes more sense i think

Have two turns: red or blue
check if hint exists
if yes => guesser turn
if no => spymaster turn
clear hint at endTurn

//Allow the spymaster for the first team (isSpyMaster && team = currentTeam) to go
	Should allow spymaster to input a clue, and submit it
	Should allow spymaster to input a number, and submit it
	Once Submitted, the spymaster button should deactivate,
	Spy Masters team should be allowed to go
		FUN!
			make a history component, so that people can see the previous clues they were given?

//Allow the spy/spies from the right team (isSpy && team = currentTeam) to go
	Should allow the spy to choose a card
	Should be allowed to choose the number of cards that the spymaster specifies
		Should I try to allow the numbers to stack up?
	If the number of guesses they have is > 0 and the cards they pick are == their team color
	allow them to continue, else change turn

	Also:
		If they choose a card, that should decrease 1 from the cards remaining depending
			on the color of the card, indiscriminate to whose turn it is.
		And also should decrease the number of turns they can take by one

	//changeTurn or end Turn
		if currentplayer is spy && team == blue ? red : blue and set currentplayer to spymaster
		else change turn to spy ad dont change teams
		if currentplayer is spy && color = black, end game and team of current player loses

//Overarching User Experience: LOL unneccessary bullshit

	Should allow for two computers to be enough - this can be done by disabling the onClicks
	for the spymaster and spy, and simply saying whose turn it is?
	And whoever touches it, well...its touched?

	Should scale to size well -IDC -NOT NOW
*/


//Who should go first? & Making the board

//creating the legend
//old code is from Start.jsx
//just moved the starting color out into a whoGoesFirst func
import wordlist from '../wordlist'

export function whoGoesFirst() {
	return (Math.floor(Math.random() * 2) == 0) ? 'blueTeam' : 'redTeam';
}

//changing the function deal to do this instead : set who goes first, the shuffled array of cards,
//and then i guess integrate that into createCard? so that way it doesnt change how it looks in the database

export function generateColors() {
	const firstTeam = whoGoesFirst()
  let colors = []
  if (firstTeam === 'blueTeam') {
    colors = ['black', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red','blue' , 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'white', 'white', 'white', 'white', 'white', 'white']
  } else {
    colors = ['black', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'white', 'white', 'white', 'white', 'white', 'white']
  }
  return shuffleHelper(colors)
}

//I did not know that the shuffle algorithm had its own name @.@ the Knuth Shuffle. naisu
//ty ty stackoverflow

export function shuffleHelper(array) {
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

//then we want to integrate create card a little differently now, in quite possibly a very inefficient way. meh muahaHAHAHAHAH
//kept randomWord the same
//would be a good time to import wordlist from '../wordlist' wherever we moved this particular logic to.

export const randomWord = () => wordlist[Math.floor(Math.random()*400)]

const makeWords = () => shuffleHelper(wordlist).slice(0, 25)

//oof. losing coherence at this point, but lets finish the goddamn integration.yayyy es6

export function createCards() {
	const colors = generateColors()
	const words = makeWords()
  const cards = []
  for (let i=0; i<25; i++){
    cards.push({word:words[i], color:colors[i]})
	}
  return cards
}

//uhhhhhh someone plz check my work on the above code....lulz
//i just copied in lines 128-129, and have not checked how well they play with the surrounding code

// once all of these functions above are checked to make sure they're solid and bug-free, they
//should be able to replace lines 44-68

//functionality of deal() should be ok with just createCard(...,...)


//Allow the spymaster for the first team (isSpyMaster && team = currentTeam) to go
//so...giving hint and number?

//I feel like most of this part (spymaster work) would be on the component side of things

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
    if (activeTeam === 'redTeam') {
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

export const updateGuessesAllowed = function(cardColor, displayHint, activeTeam) {
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
    if (activeTeam === 'redTeam') {
      newTeam = 'blueTeam'
    } else {
      newTeam = 'redTeam'
    }
  }
  return newTeam
}



//at some point, we will want to do export * from './gameLogic.js'   mebbe when there are fewer comments
