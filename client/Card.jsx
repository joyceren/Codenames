import React from 'react'
import check from '../public/check.png'
import {connect} from 'react-redux'
import {db} from '../fire'

function Card({ word, handleClick, spyMaster }) {
  const classNames = spyMaster ? `card ${word.color}`: `card ${word.color} ${word.flipped}`
  return(
    <div id={word.word} onClick={!spyMaster && handleClick} className={classNames}>
      <h2>{word.word}</h2>
      <img src={check} className={`check-${spyMaster && word.flipped}`} />
    </div>
  )
}

const mapState = state => ({
  spyMaster:state.spyMaster
})

const mapDispatch = dispatch => ({
  handleClick(e){
    const word = e.target.id
    db.collection("game").where("word", "==", word)
    dispatch({type:"FLIP_CARD", card: word})
  },
})

export default connect(mapState, mapDispatch)(Card)
