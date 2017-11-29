import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import firebase, { db } from '../fire'
import wordlist from '../wordlist'

import {makeNewGame} from './gameLogic'
import {Game} from '~/fire'
import withAuth from './withAuth'

const UserHome = ({history, user}) => {
  const onClick = e => {makeNewGame(history, user.uid)}

  return(
    <div className="main-container">
      <div className="button" onClick={onClick}><h2>NEW GAME</h2></div>
      <Link to="/lobby" className="button"><div><h2>JOIN GAME</h2></div></Link>
    </div>
  )
}



export default withRouter(withAuth(UserHome))
