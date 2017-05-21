import React from 'react'
import Button from 'components/Button'

import './LoginView.scss'

const LoginView = ({ loginUser }) => {
  const handleLogin = () => {
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        loginUser(response)
        console.log('Logged in.', response)
      } else {
        FB.login(function (response) {
          if (response.authResponse) {
            loginUser(response)
          }
        })
      }
    })
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
