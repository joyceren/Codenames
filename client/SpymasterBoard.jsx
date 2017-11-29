import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'
import Sidebar from './Sidebar'
import { selectCard } from './store'


const SpyMaster = ({legend}) => {
  return (
    <div>
    <div className="board">
    {
      legend.map(card => <Card key={card.word} word={card.word} color={card.color} />)
    }
    </div>
    <Sidebar />
    </div>
  )
}

export default SpyMaster
