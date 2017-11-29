import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'
import Sidebar from './Sidebar'
import { selectCard } from './store'


const Board = props => {
  const { game, cards, turn, user, createClicker, gameRef } = props
  const checkGameStatus = status => {
    switch(status){
      case 'pending':
        return (<div className="button" onClick={props.startGame}>Start Game!</div>)
      case "in progress":
        return cards.map((word, index) => (
            <Card key={word.word} word={word.word} color={word.color} handleClick={createClicker(index)} />
          ))
      case undefined:
        return (<div className="main-container">waiting for game...</div>)
      default:
        return(<div>I don't know what's happening... {status}</div>)
    }
  }
  console.log('status= ', props.game.status, ' return from check status= ', checkGameStatus(props.game.status))
  console.log('gameRef on board props=', gameRef)

  return(
    <div>
      <div className="board">
      {checkGameStatus(props.game.status)}
      </div>
      <Sidebar user={user} clue={turn.hint} guesses={turn.guesses} turn={turn.color}/>
    </div>
  )
}

const mapState = state => state

const mapDispatch = (dispatch, ownProps) => ({
  createClicker (index) {
    return () => {
      ownProps.gameRef.get()
      .then(res => {
        const firestoreGameData = res.data()
        dispatch(selectCard(index, firestoreGameData.legend[index].color))
      })
    }
  },
  startGame(){
    dispatch({type:"START_GAME", firstTeam:ownProps.game.first})
  }
})


export default connect(mapState, mapDispatch)(Board)
