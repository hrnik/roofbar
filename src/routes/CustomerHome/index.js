import CustomerBarContainer from './containers/CustomerBarContainer'
import { injectReducer } from 'store/reducers'
import reducer, { fetchDrinks } from './modules/customerBar'

// Sync route definition
export default (store) => ({
  getComponent (nextState, cb) {
    const state = store.getState()

    if (!state.customerBar || state.customerBar.drinks.length) {
      store.dispatch(fetchDrinks())
    }

    injectReducer(store, { key: 'customerBar', reducer })

    cb(null, CustomerBarContainer)
  }
})
