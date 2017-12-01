import React from 'react'
import firebase, {db, gameById, joinGame} from '~/fire'
import Board from './Board'
import GameProvider from './GameProvider'
import {createCards} from './gameLogic'
import Sidebar from './Sidebar'
import withAuth from './withAuth'
import {whoGoesFirst} from './gameLogic'
import EndScreen from './EndScreen'
import {withRouter} from 'react-router-dom'

class GameComponent extends React.Component {

	constructor(){
		super()
		this.startGame=this.startGame.bind(this)
		this.setGameStatus=this.setGameStatus.bind(this)
		this.resetGame=this.resetGame.bind(this)
		this.updateTeam=this.updateTeam.bind(this)
		this.updateRole=this.updateRole.bind(this)

		//I feel like there's a better way to bind functions in a class?
	}

	componentDidMount() {
		if(!this.props.user.uid) this.props.history.push('/home')
		this.listen(this.props)

	}

	componentWillReceiveProps(incoming) {
		this.listen(incoming)
	}

	componentWillUnmount() {
		this.unsubscribe && this.unsubscribe()
	}

	listen({game:ref, user}) {
		this.unsubscribe && this.unsubscribe()
		if (!user) return
		this.unsubscribe = ref.onSnapshot(snap => {
			if(snap.exists){
				const game = snap.data()
				// console.log('got snapshot:', game)
				if (!game.players[this.props.user.uid])
					joinGame(this.props.game.id)
				this.setState({game, ref})
			}
		})
	}

	startGame(){
    const {ref} = this.state
		const firstTeam = whoGoesFirst()
		const legend = createCards(firstTeam)
		const cards = legend.map(card => ({word:card.word}))
		ref.set({status:'in progress', legend}, {merge:true})
		.then(() =>
			ref.collection("journal").add(({
				type:"START_GAME",
				cards,
				firstTeam,
				ts: firebase.firestore.FieldValue.serverTimestamp()
			}))
		)
		// .then(res => {
		// 	if(this.props.user.uid)
		// 	db.collection("users").doc(this.props.user.uid).add(res.id)
		// })

		//if status is pending then pass this function in as a prop
		//to a view with a button that calls this function
  }

	resetGame() {
		const {ref} = this.state
		ref.update({status:"pending"})
		.then(() => {
			ref.collection('journal').get()
			.then(snapshot => {snapshot.docs.forEach(doc => doc.ref.delete())})
		})
	}

	setGameStatus(status){
		// if (!status) this.state.ref.update({status:"aborted"})
		if (typeof status !== "string") this.state.ref.update({status:"aborted"})
		else this.state.ref.update({status})
		//if status is in progress then pass this function in as a prop
		//have this function be called when the game ends
		//pass in a string with the winner or the loser
	}

	updateTeam(e){
		const {ref, game} = this.state
		const {email, uid} = this.props.user
		const team = e.target.id==="role" ? this.yourTeam : e.target.id
		const players = Object.assign({}, game.players, {[uid]:{email, team, role:this.yourRole}})
		ref.update({players})
	}

	updateRole(){
		const {ref, game} = this.state
		const {email, uid} = this.props.user
		const role = this.yourRole==="player"? 'spymaster' : 'player'
		const players = Object.assign({}, game.players, {[uid]:{email, team:this.yourTeam, role}})
		ref.update({players})
		.then(res => console.log(res))
	}

	get yourRole() {
		return this.state.game.players[this.props.user.uid].role
	}

	get isSpymaster() {
		return this.yourRole === 'spymaster'
	}

	get yourTeam(){
		return this.state.game.players[this.props.user.uid].team
	}

	get View() {
		const {status} = this.state.game
		switch(status) {
			case "pending":
				return () => {
					return (
						<div className="board">
							<div className="sidebar-box">
				        Join a team:
				        <div id="red" className={`red player${this.yourTeam==="red"}`} onClick={this.updateTeam}>Red Team</div>
				        <div id="blue" className={`blue player${this.yourTeam==="blue"}`} onClick={this.updateTeam}>Blue Team</div>
								<br/>
								Are you a spymaster? <br/>
				        <div id="role" onClick={this.updateRole} className="role-btn">{this.yourRole==="spymaster" ? <img className="checkbox" src="http://www.clker.com/cliparts/0/A/D/Z/M/8/magnifying-glass-hi.png"/>:<div></div>}</div>
							</div>
							<div className="button" onClick={this.startGame}>
								Start Game!
							</div>
						</div>
					)
				}

			case "in progress":
				return () => <Board yourRole={this.yourRole} legend={this.isSpymaster ? this.state.game.legend : "no cheating!"} />

			default:
				return () => <EndScreen status={status} resetGame={this.resetGame}/>
		}
	}

	get journal() {
		return this.state.ref.collection("journal")
	}

	onAction = (action, dispatch) => {
		if (action.type === 'SELECT_CARD') {
			const color = this.state.game.legend[action.index] && this.state.game.legend[action.index].color
			console.log("setting color to...", color)
			if(color==="black") this.setGameStatus(`${action.team}-killed`)
			if(color!==action.team) dispatch({type:"END_TURN"})
			dispatch({
				type: 'REVEAL_CARD',
				index: action.index,
				color,
			})
		}
	}

	render() {
		if (!this.state) return (<div>Loading...</div>)
		return (
			<GameProvider journal={this.journal} onAction={this.onAction}>
				<div>
					<this.View />
					<Sidebar setGameStatus={this.setGameStatus} players={this.state.game.players} updatePlayer={this.updatePlayer} yourRole={this.yourRole} yourTeam={this.yourTeam}/>
				</div>
			</GameProvider>
		)
	}
}

export default withRouter(withAuth(GameComponent))
