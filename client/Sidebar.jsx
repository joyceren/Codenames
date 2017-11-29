import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import HintDisplay from './HintDisplay'

const Sidebar = props => {

  console.log(props)

  return (
    <div className="sidebar">
      <div className="sidebar-box">
        CLUE:
        <HintDisplay />
      </div>
      <hr />
      <div className="sidebar-box">
        PLAYERS:
        <div>
        {props.user.email}
        </div>
      </div>
    </div>
  )
}

const addPlayer = (game, user) => {
  //psuedocode
  game.players[user.uid] = user.displayname
}

export default Sidebar
