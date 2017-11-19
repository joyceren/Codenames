import React from 'react'

export default function Card({ word, handleClick }) {
  return(
    <div id={word.word} onClick={handleClick} className={`card ${word.color} ${word.flipped}`}>
      {word.word}
    </div>
  )
}
