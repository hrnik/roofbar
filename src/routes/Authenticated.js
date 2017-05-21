import { browserHistory } from 'react-router'

export default (store, component) => {
  const auth = store.getState().auth
  if (!auth.isAuthenticated) {
    browserHistory.push('/login')
  }

  return component(store)
}
