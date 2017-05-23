import AuthRouter from './containers/AuthRouter'
import { loginUser } from 'store/auth'
import queryString from 'query-string'

// Sync route definition
export default store => ({
  path: '/login-result',
  onEnter: ({ location }) => {
    const parsedLoaction = queryString.parse(location.search)
    console.log(parsedLoaction)
    store.dispatch(loginUser(parsedLoaction.code))
  },
  component: AuthRouter
})
