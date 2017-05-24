import React from 'react'
import Button from 'components/Button'
import { browserHistory } from 'react-router'

import './LoginView.scss'

const LoginView = ({ loginUser }) => {
  const handleLogin = () => {
    // const id = '1707886086179021'
    // const host = 'http://localhost:3000'
    const id = '1707671159533847'
    const host = 'http://roofbar.surge.sh'
    window.location.href = `http://facebook.com/v2.9/dialog/oauth?client_id=${id}&redirect_uri=${host}/login-result?response_type=code`
  }
  return (
    <div className='login-container'>
      <div className='login'>
        <div className='login__text-wraper'>
          <h2 className='login__title'>Login</h2>
          <div className='login__text'>In order to get a drink you should authorise in app</div>
        </div>
        <Button blue onClick={handleLogin}>LOGIN VIA FACEBOOK</Button>
      </div>
    </div>
  )
}

export default LoginView
