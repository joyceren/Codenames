import React, {Component} from 'react'
import store from './client/store'
import Card from './client/Card'

export default class App extends Component {
  render() {
      return (
          <Provider store={store}>
             <Card/>
          </Provider>
      );
  }
}
