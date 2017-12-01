import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import { connect } from 'react-redux';

const Sidebar = ({endTurn, setGameStatus, sendMessage, chat, players, yourTeam, yourRole, updatePlayer, onChangeFunc, turn}) => {
  const playerList = []
  for(let user in players){
    const {email, role, team} = players[user]
    const view = (
      <div key={user} className={`${team} list`}>
        {role==="spymaster" && <img className="check-list" src="http://www.clker.com/cliparts/0/A/D/Z/M/8/magnifying-glass-hi.png"/>}
        {email}
      </div>
    )
    playerList.push(view)
  }
  const {team} = turn

  const clueBox = role => {
    if(role==="spymaster"){
      return !turn.guesses ?
      (
        <div>
          <input onChange={onChangeFunc} type="text"/>
          <select onChange={onChangeFunc}>
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
        </div>
      )
      :<div>{turn.hint} {turn.guesses}</div>
    }
    else {
      const hint = turn.hint || "...waiting for clue"
      const guesses = turn.guesses || "...waiting for clue"
      return <div>{hint} {guesses} <div onClick={endTurn} className="button">End Turn</div></div>
    }
  }


  return (
    <div className="sidebar">
      {
        turn.team!=="" && (
          <div>
            <div className="sidebar-box">
            <div className={yourTeam}>
              Your Team: {yourTeam}
              <br/>
              Your Role: {yourRole}
            </div>
            </div>
            <div className="sidebar-box">
              {team.toUpperCase()} Team's Clue:
              {clueBox(yourRole)}
            </div>
          </div>
        )
      }
      <div className="sidebar-box">
        Players:
        {playerList}
      </div>
      <div className="sidebar-box">
        Chat:
        {chat.map(m => <div className="message">{m}</div>)}
        <form onSubmit={sendMessage}>
          <input type="text" name="message"/>
          <input type="submit"/>
        </form>
      </div>
      <div className="button" onClick={setGameStatus}>End Game</div>
    </div>
  )
}

const mapState = state => ({turn:state.turn, chat: state.chat})

const mapDispatch = dispatch => ({
  onChangeFunc(e){
    let key="hint"
    let type="SET_HINT"
    if(Number(e.target.value)){
      key="guesses"
      type="SET_GUESSES"
    }
    dispatch({type:type, [key]:e.target.value})
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
