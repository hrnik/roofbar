import { browserHistory } from 'react-router'
import queryString from 'query-string'
let API_URL = 'http://roofbar-dev.herokuapp.com/'
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://roofbar.herokuapp.com/'
}

/**
 * camelCase to snake_case
 * Это плохое решение для прода внешних продуктов, но для внутреннего приложения в самый раз.
 */
const camelToSnake = str =>
  str.replace(/([A-Z])/g, g => `_${g[0].toLowerCase()}`)
const snakeConvert = obj =>
  Reflect.ownKeys(obj).reduce(
    (memo, key) => Object.assign(memo, { [camelToSnake(key)]: obj[key] }),
    {}
  )

/**
 * Опции fetch по-умолчанию
 */
const defaultRequestOptions = {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
}

/**
 * Готовит объект запроса
 */
const prepare = (originalUrl, data, method, auth) => {
  const isGET = method === 'GET'
  const url = new URL(`/api${originalUrl}`, API_URL)
  if (auth.csrfToken) {
    defaultRequestOptions.headers['X-CSRFTOKEN'] = auth.csrfToken
  }
  const options = Object.assign({}, defaultRequestOptions, { method })
  let converted = {}
  if (data) {
    converted = snakeConvert(data)
    if (!isGET) {
      options.body = JSON.stringify(converted)
    }
  }
  if (isGET) {
    url.search = `?${queryString.stringify({ format: 'json', ...converted })}`
  }
  return new Request(url, options)
}

/**
 * Отправляет запрос в сеть
 */
const execute = async (...params) => {
  try {
    const request = prepare(...params)
    const response = await fetch(request)
    console.log(response)
    if (!response.ok || response.status !== 200) {
      throw response
    }
    const data = await response.json()
    return { data }
  } catch (error) {
    if (error && error.status === 401) {
      console.log('unauthorized')
      browserHistory.push('/unauthorized')
    }
    console.error("Go home, u're drunk", error)
    throw error
  }
}

const handleKnownErrors = errors => {
  // тут можно сделать обработку ошибок от апи, напр. сообщение о том, что юзер неавторизован
  // if (errors.auth_required) console.log('Всё пропало, мы не авторизованы')
}

const getRequest = (auth) => (url, data) => execute(url, data, 'GET', auth)
const postRequest = (auth) => (url, data) => execute(url, data, 'POST', auth)
const putRequest = (auth) => (url, data) => execute(url, data, 'PUT', auth)

// TODO: привести к единому виду вызов апишных методов
// всегда передавая один объект с параметрами (а не произвольный набор аргументов-параметров),
// что сделает возможным указывать константы путей вместо литералов строк
// (потребуется ввести плейсхолдеры и делать интерполяцию строк с произвольными ключами).
// тогда апи примет вид:
//
// import urls from './urls'
// ...
// export default store => ({
//   getDrink          : GET(urls.drink),
//   changeDrinkStatus : PUT(urls.putDrinkStatus),
// })
//
export default store => {
  const auth = store.auth
  const GET = getRequest(auth)
  const POST = postRequest(auth)
  const PUT = putRequest(auth)
  return {
    getDrink: id => GET(`/drinks/${id}/`),
    getDrinks: () => GET(`/drinks/`),
    changeDrinkStatus: (drinkId, status) =>
      PUT(`/drinks/status/${drinkId}/`, { status, drinkId }),
    getLimits: () => GET(`/limits/`),
    getOrders: () => GET(`/orders/list/`),
    getOrder: orderId => GET(`/orders/${orderId}/`),
    makeOrder: drinkId => POST(`/orders/`, { drinkId }),
    changeOrderStatus: (orderId, status) =>
      PUT(`/orders/status/${orderId}/`, { status, orderId }),
    login: code => GET(`/login/`, { code })
  }
}
