import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import { connect } from 'react-redux';

const Sidebar = ({status, endTurn, setGameStatus, sendMessage, chat, players, yourTeam, yourRole, updatePlayer, onSubmitFunc, turn}) => {
  const {team, hint, guesses} = turn

  const yourTeamBox = <div className="sidebar-box"><div className={yourTeam}>Your Team: {yourTeam}<br/>Your Role: {yourRole}</div></div>

  const chatBox = (
    <div className="sidebar-box">
      Chat:
      <div className="chat">
        {chat.map((m, i) => <div key={i} className="message">{m}</div>)}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" name="message"/>
        <input type="submit"/>
      </form>
    </div>
  )


  if(status==="pending") {
    const playerList = []

    for(let user in players) {
      const {email, role, team} = players[user]
      const view = (
        <div key={user} className={`${team} list`}>
          {role==="spymaster" && <img className="check-list" src="http://www.clker.com/cliparts/0/A/D/Z/M/8/magnifying-glass-hi.png"/>}
          {email}
        </div>
      )
      playerList.push(view)
    }

    return (
      <div className="sidebar">
        {yourTeamBox}
        <div className="sidebar-box">
          Players:
          {playerList}
        </div>
        {chatBox}
      </div>
    )
  }




  const clueBox = () => {
    if(yourRole==="spymaster" && team===yourTeam && !hint){
      return (
        <div className="cluebox">
          <form onSubmit={onSubmitFunc}>
            <input type="text" name="hint"/>
            <select name="guesses">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <input className="button-small" type="submit"/>
          </form>
        </div>
      )
    }
    else {
      const clue = hint ? `${hint} ${guesses}` : "...waiting for clue"
      // const clue = hint && guesses ? `${turn.hint} ${turn.guesses}` : "...waiting for clue"
      const endTurnBtn = team===yourTeam ? <div onClick={endTurn} className="button-small">End Turn</div> : <div></div>
      return <div className="cluebox"><h1>{clue}</h1>{endTurnBtn}</div>
    }
  }


  return (
    <div className="sidebar">
      {yourTeamBox}
      <div className="sidebar-box" className={team}>
        {team.toUpperCase()} Team's Clue:
        {clueBox(yourRole)}
      </div>
      {chatBox}
      <div className="button" onClick={setGameStatus}><h2>End Game</h2></div>
    </div>
  )
}

const mapState = state => ({turn:state.turn, chat: state.chat})

const mapDispatch = dispatch => ({
  onSubmitFunc(e){
    e.preventDefault()
    // console.log(e.target.hint.value)
    // console.log(e.target.guesses.value)
    dispatch({type:"SET_HINT", hint:e.target.hint.value, guesses:e.target.guesses.value})
  },
  sendMessage(e){
    e.preventDefault()
    dispatch({type:"SEND_MESSAGE", message:e.target.message.value})
    e.target.message.value=null
  },
  endTurn(e){
    dispatch({type:"END_TURN"})
  }
})

export default connect(mapState, mapDispatch)(Sidebar)
