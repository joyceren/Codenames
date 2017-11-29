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
      hint: event.target.value
    })
  }
  handleGuesses(event) {
    this.setState({
      guesses: event.target.value
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
        <div>
      <h4> Number: {this.state.guesses}</h4> 
      </div>
      <div>
      <h4> Hint: {this.state.hint}</h4> 
      </div>
        <h3>Spymaster Hint</h3>
        <br />
        <div className="form">
          <form onSubmit = {this.submitHint}>
          <label>
          <input 
            name = "Number"
            value={this.state.guesses}
            onChange={this.handleGuesses}
            type="number" placeholder="enter a number"
          />
          </label>
          <label>
        <input  
          name = "Guesses"
          value={this.state.hint}
          onChange={this.handleHint}
          type="text" placeholder="enter a hint"
        />
        </label>

        <input type="submit"/>

        </form>
        </div>
      </div>
    )
  }
}

export default withAuth(SpymasterHintForm)





