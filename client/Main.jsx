import React, { Component } from 'react'
import {connect} from 'react-redux';
import Card from './Card.jsx'
import stack from '../public/stack.png'

function Main (props) {
  const {cards, handleClick, changeView }=props
  return(
    <div>
      <nav>
        <img src={stack} className="hamburger" />
        <h1>CODENAMES</h1>
        <div onClick={changeView}><h6>Change View</h6></div>
      </nav>
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

const mapDispatch = dispatch => ({
  changeView(e){
    e.preventDefault()
    dispatch({type:"CHANGE_VIEW"})
  }
})

export default connect(mapState, mapDispatch)(Main)
