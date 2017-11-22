import React, { Component } from 'react'
import { Provider } from 'react-redux'
import firebase, { gameById, auth, provider, db } from '~/fire'
import {Switch, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'

import store from './client/store'
import Game from './client/Game'
import Start from './client/Start'
import Navbar from './client/Navbar'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/:gameId" component={
            ({match: {params: {gameId}}}) => <Game game={gameById(gameId)} />
          } />
        </Switch>
      </div>
    </Router>
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
