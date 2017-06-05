// const API_URL = 'http://localhost:3004'
// const API_URL = 'https://demo2625454.mockable.io'
import queryString from 'query-string'
const API_URL = 'https://roofbar.herokuapp.com/'

/**
 * camelCase to snake_case
 * Это плохое решение для прода внешних продуктов, но для внутреннего приложения в самый раз.
 */
const camelToSnake = str => str.replace(/([A-Z])/g, g => `_${g[0].toLowerCase()}`)
const snakeConvert = obj =>
  Reflect.ownKeys(obj).reduce((memo, key) => Object.assign(memo, { [camelToSnake(key)]: obj[key] }), {})

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
const prepare = (originalUrl, data, method) => {
  const isGET = method === 'GET'
  const url = new URL(`/api${originalUrl}`, API_URL)
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
    const data = await response.json()
    console.log('Response: ', data)
    if (data) handleKnownErrors(data.errors)
    return { data }
  } catch (error) {
    console.error("Go home, u're drunk", error)
  }
}

const handleKnownErrors = errors => {
  // тут можно сделать обработку ошибок от апи, напр. сообщение о том, что юзер неавторизован
  // if (errors.auth_required) console.log('Всё пропало, мы не авторизованы')
}

const GET = (url, data) => execute(url, data, 'GET')
const POST = (url, data) => execute(url, data, 'POST')
const PUT = (url, data) => execute(url, data, 'PUT')

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
export default store => ({
  getDrink: id => GET(`/drinks/${id}/`),
  getDrinks: () => GET(`/drinks/`),
  changeDrinkStatus: (drinkId, status) => PUT(`/drinks/status/${drinkId}/`, { status, drinkId }),
  getLimits: () => GET(`/limits/`),
  getOrders: () => GET(`/orders/list/`),
  getOrder: orderId => GET(`/orders/${orderId}/`),
  makeOrder: drinkId => POST(`/orders/`, { drinkId }),
  changeOrderStatus: (orderId, status) => PUT(`/orders/status/${orderId}/`, { status, orderId }),
  login: code => GET(`/login/`, { code })
})
