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
          cards.length ? cards.map((word, i) => (<Card key={i} word={word} />)) :
          <div className="main-container">Searching for game...</div>
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
    .then(doc => {
      if (doc.exists) {
        const cards = Object.values(doc.data().cards)
        dispatch({type:"SET_CARDS", cards})
      }
      else dispatch({type:"SET_CARDS", cards:[{word:"No game found... :*(", flipped: true}]})
    })
    .catch(err => console.error(err))
  }
})

export default connect(mapState, mapDispatch)(Main)
