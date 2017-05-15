import CustomerBarContainer from './containers/CustomerBarContainer'
import { injectReducer } from 'store/reducers'
import customerBarReducer, { fetchDrinks } from './modules/customerBar'
import customerOrdersReducer, { fetchAllCustomerOrders } from './modules/orders'

// Sync route definition
export default (store) => ({
  getComponent (nextState, cb) {
    const state = store.getState()

    if (!state.customerBar || state.customerBar.drinks.length) {
      store.dispatch(fetchDrinks())
    }

    if (!state.customerOrders || state.customerOrders.orders.length) {
      store.dispatch(fetchAllCustomerOrders())
    }

    injectReducer(store, { key: 'customerBar', reducer:customerBarReducer })
    injectReducer(store, { key: 'customerOrders', reducer:customerOrdersReducer })

    cb(null, CustomerBarContainer)
  }
})
