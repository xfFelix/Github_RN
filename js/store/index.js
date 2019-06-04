import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer'
import { middleware } from '../navigator/AppNavigator'

const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function')
  } else {
    console.log('dispatching:', action)
  }
  next(action)
  console.log('nextState:',store.getState())
}

const middlewares = [
  middleware,
  thunk,
  logger
]

export default createStore(reducer, applyMiddleware(...middlewares))