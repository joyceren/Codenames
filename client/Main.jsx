import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import stack from '../public/stack.png'
import {db} from '../fire'

class Main extends Component {

  componentDidMount() {
    const { gameId } = this.props.match.params
    this.props.loadBoard(gameId)
  }

  render() {
    const { cards } = this.props
    return(
      <div>
        <div className="board">
        {
          cards.map(word => {
            return (
              <Card key={word.word} word={word} />
            )
          })
        }
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cards: state.cards,
})

const mapDispatch = dispatch => ({
  loadBoard(gameId) {
    db.collection("games").doc(gameId).get()
    .then(doc => doc.exists ? console.log(typeof doc.data()):console.log("doesn't exist!"))
    .catch(err => console.error(err))
  }
})

export default connect(mapState, mapDispatch)(Main)
