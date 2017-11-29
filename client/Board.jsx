import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'


const Board = props => {
  const { cards, turn, handleClick } = props
  return(
    <div>
      <div className="board">
      {
        cards.length ? cards.map((word, index) => (<Card key={word.id} word={word} index={index} handleClick = {handleClick} />)) :
        <div className="main-container">Searching for game...</div>
      }
      </div>
    </div>
  )
}

const mapState = state => state

const mapDispatch = (dispatch, ownProps) => ({

  handleClick(e){
    const index = db.collection("games").doc()
    const action = {type: "PICK", index: "" ,color: "" }
    var docRef = db.collection("games").doc(e.target.id).collection("journal");
    docRef.push({ACTIONTBA})
  }

})

export default connect(mapState, mapDispatch)(Board)
