import React, {Component} from 'react'
import firebase from '../fire'
import withAuth from './withAuth'


class SpymasterHintForm extends Component {
  constructor() {
    super()
    this.state = {
      guesses: 1,
      hint: '',
    }
    this.handleGuesses = this.handleGuesses.bind(this)
    this.handleHint = this.handleHint.bind(this)
    this.submitHint = this.submitHint.bind(this)
  }

  handleHint(event, data) {
    this.setState({
      possibleHint: event.target.value
    })
  }
  handleGuesses(event) {
    this.setState({
      numberOfWordsToGuess: event.target.value
    })
  }
  submitHint() {
    this.setState({previousState: this.state})
    //update database to number of turns for certain team?
    //update database to hint for team
    this.setState({
      guesses: 1,
      hint: '',

    //reset the form should happen already?
    })
  }

  render() {
    return (
      <div>
        <h3>Spymaster Hint</h3>
        <br />
        <div className="form">
          <form onSubmit = {this.state.submitHint}>
          <input 
            name = "Number"
            value={this.state.guesses}
            onChange={this.state.handleGuesses}
            type="number" placeholder="enter a number"
          />
        <input  
          name = "Guesses"
          value={this.state.hint}
          onChange={this.state.handleHint}
          type="text" placeholder="enter a hint"
        />
        <input type="submit" value="Submit hint" onChange = {this.state.submitHint}/>
        </form>
        </div>
      </div>
    )
  }
}

export default withAuth(SpymasterHintForm)





