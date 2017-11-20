import React, { Component } from 'react'
import { Provider } from 'react-redux'
import firebase, { auth, provider, db } from '~/fire'
import {Switch, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import store from './client/store'
import Main from './client/Main'
import Start from './client/Start'
import Navbar from './client/Navbar'



export default class App extends Component {

  constructor(props){
    super(props)
    this.state = { user: null }
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    this.initial()
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({user: null})
      })
  }

  initial(){
    db.collection("games").get()
    .then(querySnap => {
      console.log('full query snapshot=', querySnap)
        querySnap.forEach(doc => {console.log(doc.data())})
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Start} />
              <Route path="/:gameId" component={Main} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
