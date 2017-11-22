import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { db } from '../fire'
import wordlist from '../wordlist'

const Start = (props) => {
  return(
    <div className="main-container">
      <div className="button" onClick={props.makeGame}><h2>START GAME</h2></div>
      <div className="button"><h2>JOIN GAME</h2></div>
    </div>
  )
}

const mapState = state => ({})

const mapDispatch = (dispatch, ownProps) => ({
  makeGame () {
    const startingColor = Math.round(Math.random()) ? "red" : "blue"
    const cards = []
    cards.push(createCard(cards, "black"))
    cards.push(createCard(cards, startingColor))
    for(let i=0; i<8; i++){
      cards.push(createCard(cards, "red"))
      cards.push(createCard(cards, "blue"))
    }
    while(cards.length<25){
      cards.push(createCard(cards, "white"))
    }

    db.collection('/games').add({players: {}, status: "pending", turn: startingColor })
    .then(res => {
      cards.forEach(word => db.doc(res.path).collection("cards").add(word))
      return res.id
    })
    .then(id => {
      ownProps.history.push("/"+id)
    })
  }
})

const createCard = (array, color) => {
  let word = randomWord()
  if(array.includes(word)) word = randomWord()
  return {word, color, flipped: false}
}

const randomWord = () => wordlist[Math.floor(Math.random()*400)]

export default withRouter(connect(mapState, mapDispatch)(Start))
