import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'
import Sidebar from './Sidebar'
import { selectCard } from './store'


const Board = props => {
  console.log(props)
  const { cards, turn, user, createClicker } = props

  return(
    <div>
      <div className="board">
      {
        cards.length ?
        cards.map((word, index) => {

          return (
            <Card key={word.id} word={word.word} color={word.color} handleClick={createClicker(index)} />
          )
        })
        : <div className="main-container">Searching for game...</div>
      }
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
  }
})


export default connect(mapState, mapDispatch)(Board)
