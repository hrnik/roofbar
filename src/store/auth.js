import API from 'api'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

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

const ACTION_HANDLERS = {
  [LOGIN_START]: (state, action) => {
    return { ...state, isAuthenticated: false }
  },
  [LOGIN_SUCCESS]: (state, action) => {
    return { ...state, ...action.payload, isAuthenticated: true }
  },
  [LOGIN_ERROR]: (state, action) => {
    return { ...state, isAuthenticated: false }
  }
}

const initialState = {
  isAuthenticated: !!localStorage.getItem('access_token'),
  role: undefined
}

export default function customerOrdersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
