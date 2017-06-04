import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux'

import locationReducer from './location'
import authReducer from './auth'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    notifications,
    location: locationReducer,
    auth:authReducer,
    ...asyncReducers,
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
