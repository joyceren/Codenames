import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {auth, db, provider} from '../fire'
import stack from '../public/stack.png'
import withAuth from './withAuth'

const Navbar = withAuth((props) => {
  return (
    <nav>
      <img src={stack} className="hamburger" />
      <Link to="/home"><h1>CODENAMES</h1></Link>
      <div className="login" onClick={props.user ? props.signOut : props.signIn}>
        {props.user ? <h6>LOG OUT</h6> : <h6>LOG IN</h6>}
      </div>
    </nav>
  )
})

//
// const mapState = state => ({
//   currentUser: state.currentUser && state.currentUser.email,
// })
//
// const mapDispatch = (dispatch, ownProps) => ({
//   login(){
//     auth.signInWithPopup(provider)
//     .then(({user}) => {
//       db.collection('users').doc(user.uid).set({email: user.email, spyMaster: true}, { merge: true });
//       dispatch({type: "SET_USER", user: user})
//     })
//   },
//   logout() {
//     auth.signOut()
//     .then(() => { dispatch({type: "SET_USER", user: null}) })
//   },
//
// })

export default Navbar
