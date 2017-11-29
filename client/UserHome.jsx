import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import firebase, { db } from '../fire'
import wordlist from '../wordlist'

import {whoGoesFirst} from './gameLogic'
import {Game} from '~/fire'
import withAuth from './withAuth'

const UserHome = ({history, user}) => {
  const onClick = e => {makeGame(history, user.uid)}

  return(
    <div className="main-container">
      <div className="button" onClick={onClick}><h2>START GAME</h2></div>
      <Link to="/lobby" className="button"><div><h2>JOIN GAME</h2></div></Link>
    </div>
  )
}

const makeGame = (history, uid) => {

  const game = db.collection('games').add({
    status: "pending",
    first: whoGoesFirst(),
    players: {
      [uid]: 'player'
    }
  })
  .then(gameRef => {
    history.push('/' + gameRef.id)
  })

}

export default withRouter(withAuth(UserHome))
