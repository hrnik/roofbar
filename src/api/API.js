const API_URL = 'http://localhost:3004'

const handleResponse = response => response.json()
const makeGetRequest = url => fetch(url).then(handleResponse)
const makeBodyRequest = (url, data, type) => fetch(url, { method: type, body: data }).then(handleResponse)
const makePostRequest = (url, data) => makeBodyRequest(url, data, 'POST')
const makePutRequest = (url, data) => makeBodyRequest(url, data, 'PUT')

export default store => ({
  getDrinks: () => {
    return makeGetRequest(`${API_URL}/drinks`)
  },
  getLimits: () => {
    return makeGetRequest(`${API_URL}/limits`)
  },
  getOrders: () => {
    return makeGetRequest(`${API_URL}/orders`)
  },
  getOrder: orderID => {
    return makeGetRequest(`${API_URL}/orders/${orderID}`)
  },
  makeOrder: drinkID => {
    return makePostRequest(`${API_URL}/orders/`, { drink_id: drinkID })
  },
  changeOrderStatus: (orderID, status) => {
    return makePutRequest(`${API_URL}/orders/${orderID}`, { status })
  }
})
