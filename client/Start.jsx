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

const makeGame = (history, uid) => {

  const cards = createCards()

  const game = db.collection('games').add({
    status: "pending",
    first: "red",
    players: {
      [uid]: 'player'
    },
    legend: cards
  })
  .then(gameRef => {
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
    return gameRef.id
  })
  .then(gameId => {
    history.push('/' + gameId)
  })
}

export default withRouter(withAuth(Start))
