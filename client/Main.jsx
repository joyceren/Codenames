import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import stack from '../public/stack.png'
import {db} from '../fire'

const Main = (props) => {
  const {cards}=props
  return(
    <div>
      <div className="board">
      {
        cards.map(word => {
          return (
            <Card key={word.word} word={word} />
          )
        })
      }
      </div>
    </div>
  )
}

const mapState = state => ({
  cards: state.cards,
})

export default connect(mapState)(Main)
