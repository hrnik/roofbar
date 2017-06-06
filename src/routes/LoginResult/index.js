import AuthRouter from './containers/AuthRouter'
import { loginUser } from 'store/auth'
import queryString from 'query-string'

// Sync route definition
export default store => ({
  path: '/login-result',
  onEnter: ({ location }) => {
    const parsedLoaction = queryString.parse(location.search)
    const code = parsedLoaction.code
    if (code) {
      store.dispatch(loginUser(code))
    }
  },
  component: AuthRouter
})
