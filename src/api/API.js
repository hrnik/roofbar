const API_URL = 'http://localhost:3004'

export default (store) => ({
  getDrinks: () => {
    return fetch(`${API_URL}/drinks`).then(response => response.json())
  },
  getLimits: () => {
    return fetch(`${API_URL}/limits`)
  }
})
