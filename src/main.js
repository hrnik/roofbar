import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import './arrayinlcudespf.js'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(<AppContainer store={store} routes={routes} />, MOUNT_NODE)
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = error => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
} else {
  Raven.config('https://6da2f7d95df94c1b958748563f2435bd@sentry.io/177640').install()
}

// This is the "Offline page" service worker

// Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker
if (navigator && navigator.serviceWorker) {
  // Register the ServiceWorker
  navigator.serviceWorker
    .register('service-worker.js', {
      scope: './'
    })
    .then(function (reg) {
      console.log('Service worker has been registered for scope:' + reg.scope)
    })
} else {
  console.log('SW active service worker found, no need to register')
}

// ========================================================
// Go!
// ========================================================
render()
