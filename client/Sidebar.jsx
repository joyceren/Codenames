import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import HintDisplay from './HintDisplay'
import SpymasterHintForm from './SpymasterHintForm'

const Sidebar = props => {

  console.log(props)

  return (
    <div className="sidebar">
      <div className="sidebar-box">
        <HintDisplay />
        <br />
        <SpymasterHintForm />
        <br />
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
