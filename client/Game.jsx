import React from 'react'
import {Game} from '~/fire'
import Board from './Board'
import SpymasterBoard from './SpymasterBoard'
import GameProvider from './GameProvider'

class GameComponent extends React.Component {
	componentDidMount() {
		this.listen(this.props)
		if(!this.props.user) this.props.history.push('/')
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
			const game = snap.data()
			console.log('got snapshot:', game)

			if (!game.players[this.props.user.uid])
				this.game.join()

			this.setState({game})
		}, console.error)
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

	// get View() {
	// 	if (this.isSpy) return Board
	// 	return SpymasterBoard
	// }

	get journal() {
		return this.game.journal
	}

	checkSpymaster = (action, dispatch) => {
		if (this.isSpyMaster && action.type === 'SELECT_CARD') {
			dispatch({
				type: 'SPYMASTER_UPDATE',
				index: action.index,
				color: this.state.game.legend[action.index].color,
			})
		}
	}

	//remember to add doNotSync property to spyMaster actions that you don't want to sync

	render() {
		if (!this.state) return null
		const {View, journal} = this

		return <GameProvider journal={journal} checkSpymaster={this.checkSpymaster}><Board /></GameProvider>
	}
}


import withAuth from './withAuth'

export default withAuth(GameComponent)
