import React from 'react'
import Button from 'components/Button'
import { browserHistory } from 'react-router'

import './LoginView.scss'

const LoginView = ({ loginUser }) => {
  const handleLogin = () => {
   window.location.href = `http://facebook.com/v2.9/dialog/oauth?client_id=1707886086179021&redirect_uri=http://localhost:3000/login-result`
    // FB.getLoginStatus(function (response) {
    //   if (response.status === 'connected') {
    //     loginUser(response)
    //     console.log('Logged in.', response)
    //   } else {
    //     FB.login(function (response) {
    //       if (response.authResponse) {
    //         loginUser(response)
    //       }
    //     })
    //   }
    // })
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
