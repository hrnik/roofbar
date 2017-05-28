import CommonBarmenViewContainer from './containers/CommonBarmenViewContainer'
import { injectReducer } from 'store/reducers'
import barReducer, { fetchDrinks } from 'store/bar'
import BarmenOrdersReducer, { fetchAllCustomerOrders } from 'store/orders'
import BarmenManage from '../BarmenManage'
import BarmenOrder from '../BarmenOrder'

// Sync route definition
export default store => ({
  childRoutes: [BarmenOrder(store), BarmenManage(store)],
  getComponent (nextState, cb) {
    const state = store.getState()

    if (!state.bar || state.bar.drinks.length) {
      store.dispatch(fetchDrinks())
    }

    if (!state.barmenOrders || state.barmenOrders.orders.length) {
      store.dispatch(fetchAllCustomerOrders())
    }

    injectReducer(store, { key: 'bar', reducer: barReducer })
    injectReducer(store, { key: 'barmenOrders', reducer: BarmenOrdersReducer })

    cb(null, CommonBarmenViewContainer)
  }
})
