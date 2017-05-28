import ManageContainer from './containers/ManageContainer'

// Sync route definition
export default (store) => ({
  path:'/manage',
  getComponent (nextState, cb) {
    cb(null, ManageContainer)
  }
})
