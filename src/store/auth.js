import { browserHistory } from 'react-router'
import API from 'api'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const CLEAR_AUTH = 'CLEAR_AUTH'
export const CHECK_AUTH = 'CHECK_AUTH'

export const loginUser = creds => (dispatch, getState) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch({
    type: LOGIN_START
  })
  const clientAPI = API(getState())

  return clientAPI
    .login(creds)
    .then(response => {
      console.log('LOGIN SUCCES', response)
      try {
        localStorage.setItem('jwtToken', response.data.jwt_token)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('csrfToken', response.data.csrf_token)
      } catch (error) {}
      // Dispatch the success action
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response
      })
    })
    .catch(error => {
      console.log('LOGIN ERROR', error)
      dispatch({
        type: LOGIN_ERROR
      })
      browserHistory.push('/unauthorized')
    })
}

export const clearAuth = () => dispatch => {
  try {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('role')
    localStorage.removeItem('csrf_token')
  } catch (error) {}
  dispatch({ type: CLEAR_AUTH })
}

export const checkAuth = () => (dispatch, getState) => {
  const clientAPI = API(getState())
  dispatch({
    type: CHECK_AUTH
  })
  clientAPI.checkAuth()
}

const getInitialState = () => {
  let isAuthenticated = false
  let jwtToken = undefined
  let role = undefined
  let csrfToken = undefined
  try {
    jwtToken = localStorage.getItem('jwtToken')
    isAuthenticated = !!jwtToken
    role = localStorage.getItem('role')
    csrfToken = localStorage.getItem('csrfToken')
  } catch (error) {}
  return {
    isAuthenticated,
    jwtToken,
    role,
    csrfToken
  }
}

const ACTION_HANDLERS = {
  [LOGIN_START]: (state, action) => {
    return { ...state, isAuthenticated: false }
  },
  [LOGIN_SUCCESS]: (state, action) => {
    return { ...state, ...action.payload.data, csrfToken : action.payload.data.csrf_token, jwtToken: action.payload.data.jwt_token, isAuthenticated: true }
  },
  [LOGIN_ERROR]: (state, action) => {
    return { ...state, isAuthenticated: false }
  },
  [CLEAR_AUTH]: state => {
    return { ...getInitialState() }
  }
}

export default function customerOrdersReducer (
  state = getInitialState(),
  action
) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
