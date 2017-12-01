import React from 'react'
import check from '../public/check.png'
import {connect} from 'react-redux'
import {db} from '../fire'

export default function Card({ flipped, word, color, handleClick, yourRole, currentTeam }) {

  return(
    <div onClick={!color && yourRole!==currentTeam && handleClick} className={"card "+color}>
      {flipped && yourRole==="spymaster" && <img className="check-list" src="http://www.clker.com/cliparts/0/A/D/Z/M/8/magnifying-glass-hi.png"/>}
      <h2>{word}</h2>
    </div>
  )
}
