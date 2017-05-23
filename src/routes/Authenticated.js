import { browserHistory } from 'react-router'

export default (store, component) => {
  const route = component(store)
  const routeOnEnter = route.onEnter

  route.onEnter = (nextState, replace, callback) => {
    const auth = store.getState().auth
    if (!auth.isAuthenticated) {
      //replace('/login')
      browserHistory.push('/login')
    }

    if (routeOnEnter) {
      routeOnEnter(nextState, replace, callback)
    } else {
      callback()
    }
  }

  return route
}
