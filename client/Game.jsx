import React from 'react'
import {gameById, Game} from '~/fire'
import Board from './Board'
import SpymasterBoard from './SpymasterBoard'
import GameProvider from './GameProvider'
import {createCards} from './gameLogic'

class GameComponent extends React.Component {
	componentDidMount() {
		this.listen(this.props)
		if(!this.props.user) this.props.history.push('/home')
	}

	componentWillReceiveProps(incoming) {
		this.listen(incoming)
	}

	componentWillUnmount() {
		this.unsubscribe && this.unsubscribe()
	}

	listen({game: ref, user}) {
		this.unsubscribe && this.unsubscribe()
		if (!user) return
		this.unsubscribe = ref.onSnapshot(snap => {
			if(snap.exists){
				const game = snap.data()
				// console.log('got snapshot:', game)
				// if (!game.players[this.props.user.uid])
				// 	this.game.join()

				this.setState({game})
			}
		})
	}

	get game() { return new Game(this.props.game) }


	get role() {
		return this.state.game.players[this.props.user.uid]
	}

	get isSpymaster() {
		return this.role === 'spymaster'
	}

	get isSpy() {
		return this.role === 'player'
	}

	get View() {
		if (this.isSpy) return Board
		return SpymasterBoard
	}

	get startingColor() {
		return this.state.game.startingColor
	}

	get journal() {
		return this.game.journal
	}

	onAction = (action, dispatch) => {
		if (action.type === 'SELECT_CARD') {
			console.log("setting color to...", this.state.game.legend[action.index].color)
			dispatch({
				type: 'REVEAL_CARD',
				index: action.index,
				color: this.state.game.legend[action.index].color,
			})
		}

		if (action.type === 'START_GAME') {
			const cards = this.state.game.legend
			const action = {type: 'SETUP_CARDS', cards: this.isSpyMaster ? cards : cards.map(c => ({word:c.word})), doNotSync:true}
			dispatch(action)
		}

	}

	//remember to add doNotSync property to spyMaster actions that you don't want to sync

	render() {
		if (!this.state) return null
		const {journal, game, isSpymaster} = this
		const { user } = this.props

		return <GameProvider journal={journal} onAction={this.onAction}><this.View isSpymaster={isSpymaster} legend={this.state.game.legend} user={user} gameRef={game} /></GameProvider>
	}
}

import withAuth from './withAuth'

export default withAuth(GameComponent)
