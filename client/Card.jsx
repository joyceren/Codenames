import React from 'react'
import check from '../public/check.png'
import {connect} from 'react-redux'
import {db} from '../fire'

export default function Card({ word, color, handleClick}) {

  return(
    <div onClick={handleClick} className={"card "+color}>
      <h2>{word}</h2>
    </div>
  )
}
