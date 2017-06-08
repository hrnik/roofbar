import { browserHistory } from 'react-router'
import { checkAuth } from 'store/auth'

export default (store, component, roles = []) => {
  const route = component(store)
  const routeOnEnter = route.onEnter

  route.onEnter = (nextState, replace, callback) => {
    store.dispatch(checkAuth())
    const auth = store.getState().auth
    if (!auth.isAuthenticated || !auth.csrfToken) {
      //replace('/login')
      browserHistory.push('/unauthorized')
    }

    if (roles.length && !roles.includes(auth.role)) {
      // replace('/login')
      browserHistory.push('/')
    }

    if (routeOnEnter) {
      routeOnEnter(nextState, replace, callback)
    } else {
      callback()
    }
  }

  return route
}
