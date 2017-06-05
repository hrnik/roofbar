import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { compose, shouldUpdate, setPropTypes } from 'recompose'

const maxHeightStyle = { height: '100%' }

const AppContainer = ({ routes, store }) => (
  <Provider store={store}>
    <div style={maxHeightStyle}>
      <Router history={browserHistory} children={routes} />
    </div>
  </Provider>
)

const enhance = compose(
  shouldUpdate(() => false),
  setPropTypes({
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }),
)

export default enhance(AppContainer)
