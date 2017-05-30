import AllDrinksContainer from './containers/AllDrinksContainer'

// Sync route definition
export default (store) => ({
  path:'/drinks',
  getComponent (nextState, cb) {
    cb(null, AllDrinksContainer)
  }
})
