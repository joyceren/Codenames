import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import firebase, { db } from '../fire'
import wordlist from '../wordlist'
import spyImage from '../public/images/main-image.jpg'

import {makeNewGame} from '~/fire'
import withAuth from './withAuth'

const UserHome = ({history, user}) => {
  const onClick = e => {
    e.preventDefault()
    const gameName = null // e.target.gameName.value
    const isPrivate = null //e.target.isPrivate.value
    makeNewGame(gameName, isPrivate, history)
  }

  // const previousGames = () => {
  //   let gamesArray
  //   if(user){
  //     db.collection('users').doc(user.id).get()
  //   .then(snap => console.log(snap))
  //   }
  //   else return ["no games found!"]
  // }

  return(
    <div className="main-container">
      <div className="button" onClick={onClick}><h2>New Game</h2></div>
      <Link to="/lobby" className="button"><div><h2>Join Game</h2></div></Link>
      <div>
      All your previous games:
      <hr/>

      </div>
    </div>
  )
}



export default withRouter(withAuth(UserHome))
