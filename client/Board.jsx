import React, { Component } from 'react'
import { connect } from 'react-redux';
import Card from './Card.jsx'
import stack from '../public/stack.png'
import {db, auth, joinGame} from '../fire'

class Main extends Component {

  componentDidMount() {
    const { gameId } = this.props.match.params
    auth.onAuthStateChanged(user => {
      console.log('user=', user)
      user &&
        this.props.loadBoard(gameId)
    })
  }

  render() {
    const { cards, changeTurn, turn } = this.props
    return(
      <div>
        <div className={`clue ${turn}`} onClick={changeTurn}>turn: {turn}</div>
        <div className="board">
        {
          cards.length ? cards.map(word => (<Card key={word.id} word={word} gameId={this.props.match.params.gameId} />)) :
          <div className="main-container">Searching for game...</div>
        }
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cards: state.cards,
  turn: state.turn,
})

const mapDispatch = (dispatch, ownProps) => ({
  loadBoard(gameId) {
    const game = Game.byId(gameId)
  

    joinGame(gameId)

    db.doc(`/games/${gameId}`).get()
    .then(res => {
      const { turn } = res.data()
      console.log(turn)
      dispatch({type:"SET_TURN", turn})
    })

    db.collection(`games/${gameId}/cards/`).get()
    .then(querySnapshot => {
      const cards = []
      querySnapshot.forEach(doc => {
        const wordObj = doc.data()
        wordObj.id = doc.id
        cards.push(wordObj)
      })
      dispatch({type:"SET_CARDS", cards})
    })
      // dispatch({type:"SET_CARDS", cards:[{word:"No game found... :*(", flipped: true}]})
    .catch(err => console.error(err))
  },
  changeTurn(e) {
    dispatch({type:"CHANGE_TURN"})
  }
})

export default connect(mapState, mapDispatch)(Main)
