import BarmenOrdersContainer from './containers/BarmenOrdersContainer'
import { injectReducer } from 'store/reducers'
import barReducer, { fetchDrinks } from 'store/bar'
import BarmenOrdersReducer, { fetchAllCustomerOrders } from 'store/orders'

// Sync route definition
export default (store) => ({
  path:'/barmen',
  getComponent (nextState, cb) {
    const state = store.getState()

    if (!state.bar || state.bar.drinks.length) {
      store.dispatch(fetchDrinks())
    }

    if (!state.barmenOrders || state.barmenOrders.orders.length) {
      store.dispatch(fetchAllCustomerOrders())
    }

    injectReducer(store, { key: 'bar', reducer:barReducer })
    injectReducer(store, { key: 'customerOrders', reducer:BarmenOrdersReducer })

    cb(null, BarmenOrdersContainer)
  }
})
