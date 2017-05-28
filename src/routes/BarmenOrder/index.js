import BarmenOrdersContainer from './containers/BarmenOrdersContainer'

// Sync route definition
export default (store) => ({
  path:'/barmen',
  getComponent (nextState, cb) {
    cb(null, BarmenOrdersContainer)
  }
})
