import React from 'react'

import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'

import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from './store'

import firebase from '~/fire'
import {createCards} from './gamelogic'

export default class extends React.Component {
  componentDidMount() {
    this.createJournal(this.props.journal)
    // this..add =>
    // const cards = createCards()
    // some function that adds created cards to db.
  }

  componentWillReceiveProps(incoming, outgoing) {
    // this.createJournal(incoming.journal)
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  //ref is the firestore reference
  createJournal(ref) {
    if (this.state && this.state.store) {
      this.unsubscribe && this.unsubscribe()
      this.unsubscribe = null

      this.setState({store: null})

      return process.nextTick(() => this.createJournal(ref))
      // ^^^ this creates new listener for the next tick
    }

    const store = createStore(
      reducer,
      composeWithDevTools(
        applyMiddleware(
          createLogger({collapsed: true}),
          thunkMiddleware,
          store => dispatch => {
            // onSnapshot is the log listener
            // onSnapshot returns an unsubscribe function
            this.unsubscribe = ref.orderBy('ts')
              .onSnapshot(snap => {
                snap.docChanges.forEach(change => {
                  if (change.type === 'added') {
                    const action = change.doc.data()
                    this.props.onAction && this.props.onAction(action, dispatchViaJournal)
                    dispatch(action)
                  }
                })
              })
              // this will push every action to the changelog
              // and just dispatch any actions that have the do not sync property
              const dispatchViaJournal = action => {
                if (action.doNotSync) { return dispatch(action) }
                return ref.add({
                  ...action,
                  uid: auth.currentUser.uid,
                  ts: firebase.firestore.FieldValue.serverTimestamp()
                })
              }
            return dispatchViaJournal
          }
        )
      )
    )

    window._store = store
    this.setState({store})
  }




  // const dispatchMiddleware =

  render() {
    const {store} = this.state || {}
        , {children} = this.props
    if (!store) return null
    return <Provider store={store}>{children}</Provider>
  }
}
