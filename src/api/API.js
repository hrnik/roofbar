// const API_URL = 'http://localhost:3004'
// const API_URL = 'https://demo2625454.mockable.io'
import queryString from 'query-string'
const API_URL = 'https://roofbar.herokuapp.com/api'

const getUrl = (url, params) => `${url}?${queryString.stringify({ format: 'json', ...params })}`
// const handleResponse = response => response.json()
const handleResponse = response => {
  console.log(response)
  // response.text().then(data=>{
  //   console.log(data)
  // })
  if (!response.ok) {
    throw new Error(response)
  }
  return response
    .json()
    .then(data => {
      console.log(data)
      return { data }
    })
    .catch(error => {
      console.log(error)
    })
}
const makeGetRequest = url => fetch(url, { credentials: 'include' }).then(handleResponse)
const makeBodyRequest = (url, data, type) =>
  fetch(url, {
    method: type,
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleResponse)
const makePostRequest = (url, data) => makeBodyRequest(url, data, 'POST')
const makePutRequest = (url, data) => makeBodyRequest(url, data, 'PUT')

export default store => ({
  getDrink: id => {
    return makeGetRequest(getUrl(`${API_URL}/drinks/${id}/`))
  },
  getDrinks: () => {
    return makeGetRequest(getUrl(`${API_URL}/drinks/`))
  },
  changeDrinkStatus: (drinkID, status) => {
    return makePutRequest(getUrl(`${API_URL}/drinks/${drinkID}/`), { status })
  },
  getLimits: () => {
    return makeGetRequest(getUrl(`${API_URL}/limits/`))
  },
  getOrders: () => {
    return makeGetRequest(getUrl(`${API_URL}/orders/list/`))
  },
  getOrder: orderID => {
    return makeGetRequest(getUrl(`${API_URL}/orders/${orderID}/`))
  },
  makeOrder: drinkID => {
    return makePostRequest(getUrl(`${API_URL}/orders/`), { drink_id: drinkID })
  },
  changeOrderStatus: (orderID, status) => {
    return makePutRequest(getUrl(`${API_URL}/orders/${orderID}/`), { status })
  },
  login: code => {
    return makeGetRequest(getUrl(`${API_URL}/login/`, { code }))
  }
})
