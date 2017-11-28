import React from 'react'

import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'

import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from './store'

import firebase from '~/fire'

export default class extends React.Component {
  componentDidMount() {
    this.mountStoreAtRef(this.props.journal)
  }

  componentWillReceiveProps(incoming, outgoing) {
    this.mountStoreAtRef(incoming.journal)
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  mountStoreAtRef(ref) {
    console.log('journal ref=', ref)
    if (this.state && this.state.store) {
      this.unsubscribe && this.unsubscribe()
      this.unsubscribe = null

      this.setState({store: null})
      return process.nextTick(() => this.mountStoreAtRef(ref))
    }

    const store = createStore(
      reducer,
      composeWithDevTools(
        applyMiddleware(
          createLogger({collapsed: true}),
          thunkMiddleware,
          store => dispatch => {
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

  render() {
    const {store} = this.state || {}
        , {children} = this.props
    if (!store) return null

    return <Provider store={store}>{children}</Provider>
  }
}
