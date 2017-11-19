import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './client/store'
import Card from './client/Card'
import Main from './client/Main'

export default class App extends Component {
  render() {
      return (
          <Provider store={store}>
             <Main/>
          </Provider>
      );
  }
}
