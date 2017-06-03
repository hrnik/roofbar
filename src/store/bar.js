import API from 'api'

// ------------------------------------ Constants
// ------------------------------------

export const FETCH_DRINKS_START = 'FETCH_DRINKS_START'
export const FETCH_DRINKS_SUCCESS = 'FETCH_DRINKS_SUCCESS'
export const FETCH_DRINKS_ERROR = 'FETCH_DRINKS_ERROR'

export const FETCH_LIMITS_START = 'FETCH_LIMITS_START'
export const FETCH_LIMITS_SUCCESS = 'FETCH_LIMITS_SUCCESS'
export const FETCH_LIMITS_ERROR = 'FETCH_LIMITS_ERROR'

export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'

export const CHANGE_DRINK_STATUS_START = 'CHANGE_DRINK_STATUS_START'
export const CHANGE_DRINK_STATUS_SUCCES = 'CHANGE_DRINK_STATUS_SUCCES'
export const CHANGE_DRINK_STATUS_ERROR = 'CHANGE_DRINK_STATUS_ERROR'

export const DRINK_STATUS_AVAILABLE = 'AVAILABLE'
export const DRINK_STATUS_DISABLE = 'DISABLED'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchDrinks = () => (dispatch, getState) => {
  dispatch({ type: FETCH_DRINKS_START })

  const clientAPI = API(getState())

  return clientAPI
    .getDrinks()
    .then(respone => {
      dispatch({
        type: FETCH_DRINKS_SUCCESS,
        payload: respone.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_DRINKS_ERROR,
        payload: error
      })
    })
}

export const changeDrinksStatus = (drinkID, status) => (dispatch, getState) => {
  dispatch({ type: CHANGE_DRINK_STATUS_START, payload: status })

  const clientAPI = API(getState())

  return clientAPI
    .changeDrinkStatus(drinkID, status)
    .then(response => {
      dispatch({
        type: CHANGE_DRINK_STATUS_SUCCES,
        payload: response.data
      })
      return response.data
    })
    .catch(error => {
      dispatch({
        type: CHANGE_DRINK_STATUS_ERROR,
        payload: error
      })
      return error
    })
}

export const disableDrink = drinkId => changeDrinksStatus(drinkId, DRINK_STATUS_DISABLE)
export const enableDrink = drinkId => changeDrinksStatus(drinkId, DRINK_STATUS_AVAILABLE)

export const fetchLimits = () => (dispatch, getState) => {
  dispatch({ type: FETCH_LIMITS_START })

  const clientAPI = API(getState())

  return clientAPI
    .getLimits()
    .then(respone => {
      dispatch({
        type: FETCH_LIMITS_SUCCESS,
        payload: respone.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_LIMITS_ERROR,
        payload: error
      })
    })
}

export const setActiveCategory = category => ({
  type: SET_ACTIVE_CATEGORY,
  payload: category
})

export const actions = {
  fetchDrinks,
  fetchLimits,
  setActiveCategory
}

const ACTION_HANDLERS = {
  [FETCH_DRINKS_START]: (state, action) => {
    return { ...state, isFetchingDrinks: true }
  },
  [FETCH_DRINKS_SUCCESS]: (state, action) => {
    const drinks = action.payload
    const categories = []
    drinks.forEach(drink => {
      const { category } = drink
      if (!categories.includes(category)) {
        categories.push(category)
      }
    })
    const newState = { ...state, isFetchingDrinks: false }
    newState.drinks = drinks
    newState.categories = categories

    if (!newState.activeCategoryName) {
      newState.activeCategoryName = newState.categories[0]
    }

    if (!newState.activeDrinkID && newState.drinks) {
      newState.activeDrinkID = newState.drinks[0].id
    }

    return newState
  },
  [FETCH_DRINKS_ERROR]: (state, action) => {
    return { ...state, isFetchingDrinks: false }
  },
  [SET_ACTIVE_CATEGORY]: (state, action) => {
    const newState = { ...state }
    newState.activeCategoryName = action.payload
    return newState
  }
}

const initialState = {
  isFetchingDrinks: true,
  activeCategoryName: '',
  activeDrinkID: undefined,
  categories: [],
  drinks: [],
  limits: {}
}

export default function customerBarReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
