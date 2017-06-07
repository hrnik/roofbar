import AllDrinksContainer from './containers/AllDrinksContainer'
import { fetchAllCustomerOrders } from 'store/orders'
import { fetchLimits, fetchDrinks } from 'store/bar'
// Sync route definition
export default (store) => ({
  path:'/drinks',
  getComponent (nextState, cb) {
    const state = store.getState()

    if (!state.bar || !state.bar.drinks.length) {
      store.dispatch(fetchDrinks())
    }

    if (!state.bar || !state.bar.limits) {
      store.dispatch(fetchLimits())
    }

    if (!state.ordersStore || !state.ordersStore.orders.length) {
      store.dispatch(fetchAllCustomerOrders())
    }
    cb(null, AllDrinksContainer)
  }
})
