import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'


const mapStateToProps = state => ({
  ...state.auth
})

class AuthRouter extends React.Component {
  componentWillMount() {
    this.route(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.route(nextProps)
  }

  route(props) {
    if (props.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  render () {
    return null
  }
}

export default connect(mapStateToProps)(AuthRouter)
