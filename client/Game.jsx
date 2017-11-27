import React from 'react'

import {Game} from '~/fire'

import Board from './Board'
import SpymasterBoard from './SpymasterBoard'
import GameProvider from './GameProvider'

class GameComponent extends React.Component {
	componentDidMount() {
		this.listen(this.props)
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
			console.log('got snapshot:', snap)
			const game = snap.data()

			if (!game.players[this.props.user.uid])
				this.game.join()

			this.setState({game})
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

	get journal() {
		return this.game.journal
	}

	onAction = (action, dispatch) => {
		// console.log('game=', this.state.game, 'action=', action)
			if (this.isSpymaster && action.type === 'PICK') {
				dispatch({
					type: 'REVEAL',
					index: action.index,
					color: this.state.game.legend[action.index].color,
				})
			}
	}

	render() {
		if (!this.state) return null
		const {View, journal} = this

		return <GameProvider journal={journal} onAction={this.onAction}><View /></GameProvider>
	}
}


import withAuth from './withAuth'

export default withAuth(GameComponent)