import React from 'react'
import check from '../public/check.png'
import {connect} from 'react-redux'
import {db} from '../fire'

export default function Card({ flipped, word, color, handleClick, yourRole, currentTurn, yourTeam }) {
  const isYourTurn = currentTurn.team===yourTeam
  const isSpymaster = yourRole==='spymaster'
  const clueExists = currentTurn.guesses ? true:false

  const handleClickFalse = () => {console.log(`not your turn!`)}

  return(
    <div onClick={!flipped && isYourTurn && clueExists ? handleClick : handleClickFalse} className={"card "+color}>
      {flipped && isSpymaster && <img className="check-list" src="http://www.clker.com/cliparts/0/A/D/Z/M/8/magnifying-glass-hi.png"/>}
      <h2>{word}</h2>
    </div>
  )
}
