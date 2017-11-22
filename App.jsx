import React, { Component } from 'react'
import { Provider } from 'react-redux'
import firebase, { auth, provider, db } from '~/fire'
import {Switch, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import store from './client/store'
import Board from './client/Board'
import Start from './client/Start'
import Navbar from './client/Navbar'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/:gameId" component={Board} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

//index redirect here? ^^^^^^^^

const mapState = state => ({
  currentUser:state.currentUser
})

const mapDispatch = dispatch => ({
  checkUser () {
    auth.onAuthStateChanged(user => {
      if (user) dispatch({type: SET_USER, user})
    })
  },
})


export default App
