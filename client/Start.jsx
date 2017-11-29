import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import firebase, { db } from '../fire'
import wordlist from '../wordlist'

import {createCards, whoGoesFirst} from './gameLogic'
import {Game} from '~/fire'
import withAuth from './withAuth'

const Start = ({history, user}) => {
  return(
    <div className="main-container">
      <div className="button" onClick={makeGame(history, user.uid)}><h2>START GAME</h2></div>
      <div className="button"><h2>JOIN GAME</h2></div>
    </div>
  )
}

const makeGame = (history, uid) => () => {

  const cards = createCards()

  const game = db.collection('games').add({
    status: "pending",
    first: "red",
    players: {
      [uid]: 'player'
    },
    legend: cards
  })
  .then(gameRef =>
    gameRef.collection("journal").add({
      type: 'SETUP_CARDS',
      cards: cards.map(card => {
        const colorless = {...card}
        delete colorless.color
        return colorless
      }),
      ts: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    })
  )
  .then(game => {
    history.push('/' + game.id)
  })
}

function deal () {
  const startingColor = Math.round(Math.random()) ? "red" : "blue"
  const cards = []
  cards.push(createCard(cards, "black"))
  cards.push(createCard(cards, startingColor))
  for(let i=0; i<8; i++){
    cards.push(createCard(cards, "red"))
    cards.push(createCard(cards, "blue"))
  }
  while(cards.length<25){
    cards.push(createCard(cards, "white"))
  }
  return cards
}


//Move to separate game logic file...
const createCard = (array, color) => {
  let word = randomWord()
  if(array.includes(word)) word = randomWord()
  return {word, color, flipped: false}
}

const randomWord = () => wordlist[Math.floor(Math.random()*400)]

export default withRouter(withAuth(Start))
