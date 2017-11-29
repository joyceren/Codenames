import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import HintDisplay from './HintDisplay'
import SpymasterHintForm from './SpymasterHintForm'

const Sidebar = props => {

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
        <br />
        <br />
        RED CARDS REMAINING:
        <br />
        <div>
        {props.redCardsRemaining}
        </div>
        <br />
        BLUE CARDS REMAINING:
        <br />
        <div>
        {props.blueCardsRemaining}
        </div>
        <br />
      </div>
    </div>
  )
}

export default Sidebar
