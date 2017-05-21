import React from 'react'
import { connect } from 'react-redux'

import LoginView from '../components/LoginView'

import { loginUser } from 'store/auth'
import { browserHistory } from 'react-router'

const mapDispathToProps = {
  loginUser
}

const mapStateToProps = state => ({
  ...state.auth
})

class LoginContainer extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  render () {
    return <LoginView loginUser={this.props.loginUser} />
  }
}

export default connect(mapStateToProps, mapDispathToProps)(LoginContainer)
