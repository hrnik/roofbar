import React from 'react'

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
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginView
