import CommonBarmenViewContainer from './containers/CommonBarmenViewContainer'
import { fetchDrinks } from 'store/bar'
import { fetchAllCustomerOrders } from 'store/orders'
import BarmenManage from '../BarmenManage'
import BarmenOrder from '../BarmenOrder'

// Sync route definition
export default store => ({
  childRoutes: [BarmenOrder(store), BarmenManage(store)],
  getComponent (nextState, cb) {
    const state = store.getState()

    if (!state.bar || !state.bar.drinks.length) {
      store.dispatch(fetchDrinks())
    }

    if (!state.ordersStore || !state.ordersStore.orders.length) {
      store.dispatch(fetchAllCustomerOrders())
    }

    cb(null, CommonBarmenViewContainer)
  }
})
