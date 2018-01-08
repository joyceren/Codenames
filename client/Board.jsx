import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'

import { selectCard } from './store'
import {withRouter} from 'react-router-dom'


const Board = (props) => {
  const { setGameStatus, turn, createClicker, yourRole, yourTeam } = props
  const cards = Array.isArray(props.legend) ? props.cards.map((c, i) => {
    c.color = props.legend[i].color
    return c
  }) : props.cards

  if(yourRole==="spymaster"){
    const redWin= cards.length===25 && !cards.some(c => c.color==="red" && !c.flipped)
    const blueWin= cards.length===25 && !cards.some(c => c.color==="blue" && !c.flipped)
    if (redWin) setGameStatus("red")
    else if (blueWin) setGameStatus("blue")
  }


  return(
    <div>
      <div className="board">
        {
          cards && cards.map((word, index) => (
            <Card key={word.word} yourRole={yourRole} yourTeam={yourTeam} currentTurn={turn} flipped={word.flipped} word={word.word} color={word.color} handleClick={createClicker(index)} />
          ))
        }
      </div>
    </div>
  )

}

const mapState = state => state

const mapDispatch = (dispatch) => ({
  createClicker (index) {
    return () => {
      dispatch({type:"SELECT_CARD", index})
    }
  }
})


export default connect(mapState, mapDispatch)(Board)
