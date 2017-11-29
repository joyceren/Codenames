import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'
import Sidebar from './Sidebar'
import { selectCard } from './store'
import {resetGameStatus, whoGoesFirst} from './gameLogic'
import {withRouter} from 'react-router-dom'


class Board extends Component {

  // componentDidMount(){
  //   const {joinGameDispatch, gameRef, user} = this.props
  //   joinGameDispatch(user.uid, user.email, "player", whoGoesFirst())
  //   joinGame(gameRef.ref.id)
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if(this.props!==nextProps) this.props=nextProps
  // }
  //
  // componentWillUnmount(){
  //   const {status, user, leaveGame} = this.props
  //   if(status==="pending") leaveGame(user.uid)
  // }

  checkGameStatus = (status, createClicker) => {
    const {cards, startGame, history, user, match} = this.props
    const onClick = e => {resetGameStatus(match.params.gameId, history, user.uid)}
    switch(status){
      case 'pending':
        return (<div><div className="button" onClick={startGame}>Start Game!</div><div>remember to set your team and role!</div></div>)
      case "in progress":
        return cards.map((word, index) => (
            <Card key={word.word} word={word.word} color={word.color} handleClick={createClicker(index)} />
          ))
      case undefined:
        return (<div className="main-container">waiting for game...</div>)
      default:
        return(<div><h2>{status}</h2><div className="button" onClick={onClick}><h2>NEW GAME</h2></div></div>)
    }
  }

  render(){
    const { setPlayer, gameStatus, cards, turn, user, createClicker, blueCardsRemaining, redCardsRemaining } = this.props
    return(
      <div>
        <div className="board">
        {this.checkGameStatus(gameStatus, createClicker)}
        </div>
        <Sidebar status={gameStatus} user={user} clue={turn.hint} guesses={turn.guesses} turn={turn.color}
        redCardsRemaining= {redCardsRemaining} blueCardsRemaining = {blueCardsRemaining} />
      </div>
    )
  }
}

const mapState = state => state

const mapDispatch = (dispatch, ownProps) => ({
  createClicker (index) {
    return () => {
      dispatch({type:"SELECT_CARD", index})

    }
  },
  startGame(){
    ownProps.gameRef.ref.get()
    .then(res => {
      const {firstTeam, players} = res.data()
      console.log(players)
      if(players.length<2) dispatch({type:"SET_STATUS", status:"Not enough players!"})
      else {
        dispatch({type:"START_GAME", players, firstTeam})
        ownProps.gameRef.ref.update("status", 'in progress')
      }
    })
  },
  joinGameDispatch(id, email, role, team){
    dispatch({type:"SET_PLAYER", id, player: {email, role, team}})
  },
  leaveGame(id){
    dispatch({type: "LEAVE_GAME", id})
  },
})


export default withRouter(connect(mapState, mapDispatch)(Board))
