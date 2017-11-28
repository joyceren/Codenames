import React, { Component } from 'react'
import {db, auth, joinGame} from '../fire'
import withAuth from './withAuth'

class Lobby extends Component{

componentDidMount() {
    const { gameId } = this.props.match.params
    joinGame(gameId)
  }

render() {
	//render navbar
	//render sidebar (sidebar lets you choose whether player or spymaster? and also shows score for blue and red team)
	// Start Game : onClick  - will render board or spymasterboard? 
}

}

export default Lobby