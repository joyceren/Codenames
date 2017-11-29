import React, {Component} from 'react'
import firebase from 'APP/fire'
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
  // componentDidMount() {
  //  update the guess and ...actually would we need anything here?
  //also, i didnt look at reducers, im just sort of typing it out for structure I guess
  // }

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
        <h1>Spymaster Hint</h1>
        <div className="form">
          <input
            value={props.guesses}
            onChange={props.handleGuesses}
            type="number" placeholder="enter a number"
          />
        <input
          value={props.hint}
          onChange={props.handleHint}
          type="text" placeholder="enter a hint"
        />

        <Button onClick = {props.submitHint}> Submit hint </Button>
        </div>
      </div>
    )
  }
}

export default withAuth(SpymasterHintForm)





