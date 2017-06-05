import API from 'api'

// ------------------------------------ Constants
// ------------------------------------

export const FETCH_ORDERS_START = 'FETCH_ORDERS_START'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR'

export const FETCH_ORDER_START = 'FETCH_ORDER_START'
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS'
export const FETCH_ORDER_ERROR = 'FETCH_ORDER_ERROR'

export const MAKE_ORDER_START = 'MAKE_ORDER_START'
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS'
export const MAKE_ORDER_ERROR = 'MAKE_ORDER_ERROR'

export const CHANGE_ORDER_STATUS_START = 'CHANGE_ORDER_STATUS_START'
export const CHANGE_ORDER_STATUS_SUCCESS = 'CHANGE_ORDER_STATUS_SUCCESS'
export const CHANGE_ORDER_STATUS_ERROR = 'CHANGE_ORDER_STATUS_ERROR'

export const ORDER_STATUS_DONE = 'DONE'
export const ORDER_STATUS_PENDING = 'PENDING'
export const ORDER_STATUS_CANCELED = 'CANCELED'

export const TOOGLE_ORDERS_MODE = 'TOOGLE_ORDERS_MODE'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchAllCustomerOrders = () => (dispatch, getState) => {
  dispatch({ type: FETCH_ORDERS_START })

  const clientAPI = API(getState())

  return clientAPI
    .getOrders()
    .then(response => {
      dispatch({
        type: FETCH_ORDERS_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: FETCH_ORDERS_ERROR,
        payload: error
      })
    })
}

export const fetchOrder = orderId => (dispatch, getState) => {
  dispatch({ type: FETCH_ORDER_START })

  const clientAPI = API(getState())

  return clientAPI
    .getOrder(orderId)
    .then(response => {
      dispatch({
        type: FETCH_ORDER_SUCCESS,
        payload: response.data
      })
      return response.data
    })
    .catch(error => {
      dispatch({
        type: FETCH_ORDER_ERROR,
        payload: error
      })
      return error
    })
}

export const makeOrder = drinkId => (dispatch, getState) => {
  dispatch({ type: MAKE_ORDER_START, payload: { drinkId } })

  const clientAPI = API(getState())

  return clientAPI
    .makeOrder(drinkId)
    .then(response => {
      dispatch({
        type: MAKE_ORDER_SUCCESS,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: MAKE_ORDER_ERROR,
        payload: { error, drinkId }
      })
    })
}

export const changeOrderStatus = (orderId, status) => (dispatch, getState) => {
  dispatch({ type: CHANGE_ORDER_STATUS_START, payload: status })

  const clientAPI = API(getState())

  return clientAPI
    .changeOrderStatus(orderId, status)
    .then(response => {
      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: {
          ...response,
          status,
          order_id: orderId
        }
      })
    })
    .catch(error => {
      dispatch({
        type: CHANGE_ORDER_STATUS_ERROR,
        payload: error
      })
    })
}

export const completeOrder = orderId => changeOrderStatus(orderId, ORDER_STATUS_DONE)
export const cancelOrder = orderId => changeOrderStatus(orderId, ORDER_STATUS_CANCELED)

export const toogleEditMode = () => dispatch => {
  dispatch({
    type: TOOGLE_ORDERS_MODE
  })
}

export const actions = {
  fetchAllCustomerOrders,
  fetchOrder,
  makeOrder,
  completeOrder,
  cancelOrder,
  toogleEditMode
}

const proccesPendingList = (listID = [], order) => {
  let newListID = [].concat(listID)
  if (order.status === ORDER_STATUS_PENDING && !listID.includes(order.order_id)) {
    newListID.push(order.order_id)
  } else if (order.status !== ORDER_STATUS_PENDING && listID.includes(order.order_id)) {
    newListID = newListID.filter(item => item != order.order_id)
  }
  return newListID
}
const ACTION_HANDLERS = {
  [FETCH_ORDER_START]: (state, action) => {
    return { ...state, isFetchingOrders: true }
  },
  [FETCH_ORDERS_ERROR]: (state, action) => {
    return { ...state, isFetchingOrders: false }
  },
  [FETCH_ORDERS_SUCCESS]: (state, action) => {
    const newOrders = action.payload.reverse()
    let newPendingOrdersID = state.pendingOrdersID

    newOrders.forEach(item => {
      newPendingOrdersID = proccesPendingList(newPendingOrdersID, item)
    })

    return { ...state, orders: action.payload, pendingOrdersID: newPendingOrdersID, isFetchingOrders: false }
  },
  [FETCH_ORDER_SUCCESS]: (state, action) => {
    const order = action.payload
    let newPendingOrdersID = state.pendingOrdersID

    const newOrders = state.orders.map(item => {
      if (item.order_id === order.order_id) {
        return order
      }
      return item
    })

    newPendingOrdersID = proccesPendingList(newPendingOrdersID, order)
    return { ...state, orders: newOrders, pendingOrdersID: newPendingOrdersID }
  },
  [MAKE_ORDER_START]: (state, action) => {
    return { ...state, makingOrders: { ...state.makingOrders, [action.payload.drinkId]: true } }
  },
  [MAKE_ORDER_SUCCESS]: (state, action) => {
    const order = action.payload
    const newPendingOrdersID = proccesPendingList(state.pendingOrdersID, order)
    const newState = {
      ...state,
      pendingOrdersID: newPendingOrdersID,
      makingOrders: { ...state.makingOrders, [order.drink_id]: false },
      activeOrderID: order.id,
      orders: [action.payload, ...state.orders]
    }
    return newState
  },
  [MAKE_ORDER_ERROR]: (state, action) => {
    return { ...state, makingOrders: { ...state.makingOrders, [action.payload.drinkId]: false } }
  },
  [CHANGE_ORDER_STATUS_SUCCESS]: (state, action) => {
    const newOrders = state.orders.map(order => {
      const newOrder = action.payload
      if (order.order_id === newOrder.order_id) {
        return { ...order, status: newOrder.status }
      }
      return order
    })
    return { ...state, orders: newOrders }
  },
  [TOOGLE_ORDERS_MODE]: (state, action) => {
    return { ...state, normalMode: !state.normalMode }
  }
}

const initialState = {
  isFetchingOrders: false,
  makingOrders: {},
  activeOrderID: undefined,
  pendingOrdersID: [],
  normalMode: true,
  orders: []
}

export default function customerOrdersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
