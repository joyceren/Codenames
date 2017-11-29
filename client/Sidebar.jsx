import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import HintDisplay from './HintDisplay'
import { connect } from 'react-redux';

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
        {props.players.map(player => <div key={player.email} className={player.role+"Team"}>{player.email}</div>)}
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  const players = []
  for(let i in state.players) {players.push(state.players[i])}
  return {players}
}

const mapDispatch = dispatch => ({

})


export default connect(mapState, mapDispatch)(Sidebar)
