import React from 'react'
import withAuth from './withAuth'
import UserHome from './UserHome'

const Homepage = props => {
  return props.user ?
  <UserHome user={props.user} history={props.history}/>
  :
  (
    <div className="main-container">
      <div className="login-panel">
        <div>
          <h6>Sign In</h6>
          <form onSubmit={props.signIn}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="submit" />
          </form>
        </div>

        <div>
          <h6>Sign Up</h6>
          <form onSubmit={props.createUser}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="submit" />
          </form>
        </div>

        <div>{props.errMessage}</div>

        <div className="button" onClick={props.signInWithGoogle}>Log in with Google!!!</div>
      </div>
      <div className="rules-panel">
      RULES OF THE GAME
      </div>
    </div>
  )
}

export default withAuth(Homepage)
