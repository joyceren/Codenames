import React, { Component } from 'react'
import firebase from '../fire'
import withAuth from './withAuth'

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props) //needed?
    this.state = {
      hint: 'Water',
      guesses: 2
    }
  }

  render() {
    return (
      <div>
        <h3>Hint</h3>
        <br />
        <h4>Word: {this.state.hint} </h4>
        <h4>Guesses: {this.state.guesses}</h4>
      </div>
    )
  }
}

export default withAuth(ScoreBoard)
