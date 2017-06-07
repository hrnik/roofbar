import API from 'api'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const CLEAR_AUTH = 'CLEAR_AUTH'

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
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('role', response.data.role)
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
    })
}

export const clearAuth = () => dispatch => {
  try {
    localStorage.removeItem('access_token')
    localStorage.removeItem('role')
  } catch (error) {}
  dispatch({ type: CLEAR_AUTH })
}

const getInitialState = () => {
  let isAuthenticated = false
  let role = undefined
  try {
    isAuthenticated = !!localStorage.getItem('access_token')
    role = localStorage.getItem('role')
  } catch (error) {}
  return {
    isAuthenticated,
    role
  }
}

const ACTION_HANDLERS = {
  [LOGIN_START]: (state, action) => {
    return { ...state, isAuthenticated: false }
  },
  [LOGIN_SUCCESS]: (state, action) => {
    return { ...state, ...action.payload.data, isAuthenticated: true }
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
