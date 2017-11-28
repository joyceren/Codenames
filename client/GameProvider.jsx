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
      // If we already have a store, let's destroy it.

      // First, unsubscribe our firebase listener.
      this.unsubscribe && this.unsubscribe()
      this.unsubscribe = null

      // Then, do this annoying thing.
      //
      // If we don't do this, React does what React does, determines that
      // our render tree still has a <Provider>, and it should just send
      // that Provider new props. Unfortunately, <Provider> doesn't support
      // changing store on the fly. 😡
      //
      // So, here's a hack. We set the store to null. This forces a re-render
      // during which we return null, unmounting our Provider and everything
      // under it. Then, in the next tick, we actually mount a new <Provider>
      // with our new store.
      //
      // The lag is imperceptible.
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
    // So, this is unexpected.
    //
    // We're used to seeing <Provider> at the top of an App. But there's no rule
    // that has to be the case. In a Firebase app, it makes more sense for the app's
    // "shell" state to be managed with Firebase (and React Router). The shell
    // figures out what journal to give us based on where the user is in the app,
    // then we create a <Provider> pointing at a store whose actions are synced to
    // that Firebase ref.
    //
    // If our journal changes, we'll throw this store state away and create a new one.
    // That's fine!
    return <Provider store={store}>{children}</Provider>
  }
}