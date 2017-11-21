import React from 'react'
import { connect } from 'react-redux'
import {auth, db, provider} from '../fire'
import stack from '../public/stack.png'

const Navbar = (props) => {
  return (
    <nav>
      <img src={stack} className="hamburger" />
      <h1>CODENAMES</h1>
      <div onClick={props.login}>
        {props.currentUser ? <h6>Hi, {props.currentUser}!</h6> : <h6>Log in!</h6>}
      </div>
    </nav>
  )
}

const mapState = state => ({
  currentUser: state.currentUser && state.currentUser.email,
})

const mapDispatch = dispatch => ({
  login(e){
    auth.signInWithPopup(provider)
    .then(({user}) => {
      dispatch({type: "SET_USER", user: user})
    })
  },
  logout() {
    auth.signOut()
    .then(() => {
      dispatch({type: "SET_USER", user: null})
    })
  }
})

export default connect(mapState, mapDispatch)(Navbar)
