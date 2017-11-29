import React from 'react'
import {auth, google, email} from '~/fire'

export default Component => class extends React.Component {
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  createUser = e => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(e.target.email.value, e.target.password.value)
    .catch(err => this.setState({errMessage:err.message}))
  }
  signIn = e => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
    .catch(err => this.setState({errMessage:err.code}))
  }
  signInWithGoogle = () => auth.signInWithPopup(google)
  signOut = () => auth.signOut()

  render() {
    // Auth is not ready.
    if (!this.state) return null

    // Get the user off auth.
    const {user, errMessage} = this.state

    // Render our nested component with the user.
    return <Component {...this.props}
      user={user}
      auth={auth}
      signIn={this.signIn}
      createUser={this.createUser}
      signInWithGoogle={this.signInWithGoogle}
      signOut={this.signOut}
      errMessage={errMessage}
      />
  }
}
