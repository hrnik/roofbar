import CustomerBarContainer from './containers/CustomerBarContainer'
import { injectReducer } from 'store/reducers'
import customerBarReducer, { fetchDrinks, fetchLimits } from 'store/bar'
import customerOrdersReducer, { fetchAllCustomerOrders } from 'store/orders'

// Sync route definition
export default store => ({
  getComponent (nextState, cb) {
    const state = store.getState()

    if (!state.bar || state.bar.drinks.length) {
      store.dispatch(fetchDrinks())
    }

    if (!state.bar || state.bar.limits.length) {
      store.dispatch(fetchLimits())
    }

    if (!state.ordersStore || state.ordersStore.orders.length) {
      store.dispatch(fetchAllCustomerOrders({limit: 25}))
    }

    injectReducer(store, { key: 'bar', reducer: customerBarReducer })
    injectReducer(store, { key: 'ordersStore', reducer: customerOrdersReducer })

    cb(null, CustomerBarContainer)
  }
})
