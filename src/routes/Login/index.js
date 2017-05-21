import LoginContainers from './containers/LoginContainers'
import { injectReducer } from 'store/reducers'



// Sync route definition
export default (store) => ({
  path:'/login',
  getComponent (nextState, cb) {
    const state = store.getState()


    cb(null, LoginContainers)
  }
})
