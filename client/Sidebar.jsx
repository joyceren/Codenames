import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import HintDisplay from './HintDisplay'
import { connect } from 'react-redux';
import SpymasterHintForm from './SpymasterHintForm'

const Sidebar = props => {
  return (
    <div className="sidebar">
    { props.status==="pending" ?
      (
        <div className="sidebar-box">
          SET YOUR ROLE:
          <form>
            team:
            red<input onChange={props.changeTeam} className="switch" name="team" type="radio" value="red" />
            blue<input onChange={props.changeTeam} className="switch" name="team" type="radio" value="blue" />
            <br/>
            SpyMaster? <input onChange={props.changeRole} className="switch" name="role" type="checkbox" value="player" />
          </form>
        </div>
      )
      :<div></div>
    }
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
        {props.players.map(player => (<div key={player.email} className={player.role+"Team"}>{player.email}</div>))}
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

const mapState = state => {
  const players = []
  for(let i in state.players) {players.push(state.players[i])}
  return {players}
}

const mapDispatch = (dispatch, ownProps) => ({
  changeRole(e) {
    const role= e.target.checked ? "spymaster":"player"
    dispatch({type: "UPDATE_ROLE", id:ownProps.user.uid, role})
  },
  changeTeam(e){
    const team = e.target.value
    dispatch({type: "UPDATE_TEAM", id:ownProps.user.uid, team})
  }
})


export default connect(mapState, mapDispatch)(Sidebar)

