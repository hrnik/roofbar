import React from 'react'
import Button from 'components/Button'
import { browserHistory } from 'react-router'
import logo from './logo.svg'

import './LoginView.scss'

const LoginView = ({ loginUser }) => {
  let id = '1707886086179021'
  let host = 'http://localhost:3000'
  if (process.env.NODE_ENV === 'production') {
    id = '1707671159533847'
    host = 'http://roofbar.surge.sh'
  }

  const handleLogin = () => {
    window.location.href = `http://facebook.com/v2.9/dialog/oauth?client_id=${id}&redirect_uri=${host}/login-result&response_type=code&scope=email,public_profile`
  }
  return (
    <div className='login-container'>
      <div className='login'>
        <div className='logo'>
          <img src={logo} width='78px' height='49px' />
          <div className='logo__text'>roofbar</div>
        </div>

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
