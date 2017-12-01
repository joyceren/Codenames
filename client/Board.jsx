import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'

import { selectCard } from './store'
import {resetGameStatus, whoGoesFirst} from './gameLogic'
import {withRouter} from 'react-router-dom'


const Board = (props) => {
  const { turn, createClicker, yourRole } = props
  // const cards = Array.isArray(props.legend) ? props.legend:props.cards
  const cards = Array.isArray(props.legend) ? props.cards.map((c, i) => {
    c.color = props.legend[i].color
    return c
  }) : props.cards
  return(
    <div>
      <div className="board">
        {
          cards && cards.map((word, index) => (
            <Card key={word.word} yourRole={yourRole} currentTeam={turn.team} flipped={word.flipped} word={word.word} color={word.color} handleClick={createClicker(index, turn.team)} />
          ))
        }
      </div>
    </div>
  )

}

const mapState = state => state

const mapDispatch = (dispatch) => ({
  createClicker (index, team) {
    return () => {
      dispatch({type:"SELECT_CARD", index, team})
    }
  }
})


export default connect(mapState, mapDispatch)(Board)
