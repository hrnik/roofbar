import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Loader from 'components/Loader'

const mapStateToProps = state => ({
  ...state.auth
})

class AuthRouter extends React.Component {
  componentWillMount () {
    this.route(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.route(nextProps)
  }

  route (props) {
    if (props.isAuthenticated) {
      if(props.role === 'Barmen') {
        browserHistory.push('/barmen')
      } else {
        browserHistory.push('/')
      }
    }
  }

  render () {
    return <Loader absoluteCenter />
  }
}

export default connect(mapStateToProps)(AuthRouter)
