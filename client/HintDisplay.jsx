import React, { Component } from 'react'
import firebase from '../fire'
import withAuth from './withAuth'

class HintDisplay extends React.Component {
  constructor(props) {
    super(props) //needed?
    this.state = {
      hint: 'Water',
      guesses: 2
    }
  }

  // componentDidMount() {
  //  hint is equal to : firebase query
  //  on snapshot, should update snapshot to setState(val)
  // }
  //to be imported on the the spy board and not the spymaster board. import in spymaster board??? idk NAHH

  render() {
    return (
      <div>
        <h6>Hint</h6>
        <h6>Word: {this.state.hint} </h6>
        <h6>Guesses: {this.state.guesses}</h6>
      </div>
    )
  }
}

export default withAuth(HintDisplay)
