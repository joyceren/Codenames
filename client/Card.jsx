import React from 'react'
import check from '../public/check.png'
import {connect} from 'react-redux'
import {db} from '../fire'

export default function Card({ word, index, handleClick}) {
  const classNames = `card ${word.color}`
  return(
    <div id={index} onClick={handleClick} className={classNames}>
      <h2>{word.word}</h2>
    </div>
  )
}
