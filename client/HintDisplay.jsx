import React, { Component } from 'react'
import firebase from '../fire'
import withAuth from './withAuth'

class HintDisplay extends React.Component {
  constructor(props) {
    super(props) //needed?
    this.state = {
      hint: '',
      guesses: ''
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
        <h6>Word: props.hint</h6>
        <h6>Number of Guesses Allowed: {props.guesses}</h6>
      </div>
    )
  }
}

export default withAuth(Hint)
