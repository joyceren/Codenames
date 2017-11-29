import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'
import Sidebar from './Sidebar'
import { selectCard } from './store'


const SpyMaster = gameRef => {
  const {legend} = gameRef.ref.get()
  return (
    <div>
    legend.map(card => <Card key={word.word} word={word.word} color={word.color} handleClick={createClicker(index)} />)
    <Sidebar status={gameStatus} user={user} clue={turn.hint} guesses={turn.guesses} turn={turn.color}
    redCardsRemaining= {redCardsRemaining} blueCardsRemaining = {blueCardsRemaining} />
    </div>
  )
}

export default SpyMaster
