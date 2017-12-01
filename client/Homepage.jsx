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
        <div className="form">
          <h3>Sign In</h3>
          <form onSubmit={props.signIn}>
            <input type="email" name="email" /> <br/>
            <input type="password" name="password" /> <br/>
            <input type="submit" />
          </form>
        </div>

        <div className="form">
          <h3>Sign Up</h3>
          <form onSubmit={props.createUser}>
            <input type="email" name="email" /> <br/>
            <input type="password" name="password" /> <br/>
            <input type="submit" />
          </form>
        </div>

        <div>{props.errMessage}</div>

        <div className="button" onClick={props.signInWithGoogle}>Log in with Google!!!</div>
      </div>
      <div className="rules-panel">
      RULES OF THE GAME<br/>
      <div className="rules">
        <p className="rules">Imagine you are a spy trying to figure out who is one your team. There are 25 people in front of you, each with their own codename. You do not know the identity of these people, only your handler knows who is part of your team, and who is an enemy spy.</p>
        <br/>
        <p className="rules">Unfortunately, for security reasons, your handler can’t just tell you who is who... but they can give you a clue. Your clue comes in the form of a word that relates to the codenames of the spies on your team, and the number of names that the word matches.</p>
        <br/>
        <p className="rules">It’s up to you and your logic skills to identify all the spies on your team before the enemy does.</p>
      </div>
      </div>
    </div>
  )
}

export default withAuth(Homepage)
