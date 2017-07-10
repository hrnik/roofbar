export const getDrinkById = state => drinkId => {
  const filteredDrinks = state.bar.drinks.filter(drink => drinkId === drink.id)
  return filteredDrinks[0]
}

export const getNameDrinkById = state => drinkId => {
  const drink = getDrinkById(state)(drinkId) || {}
  return drink.name || ''
}

export const sortDrinkByCategory = (drinks, categoryName) => {
  return drinks.filter(drink => drink.category === categoryName).sort((a, b) => {
    // a должно быть равным b
    const aEnable = a.status !== 'DISABLED'
    const bEnable = b.status !== 'DISABLED'
    // return aEnable === bEnable ? 0 : aEnable ? -1 : 1
    if (aEnable !== bEnable) {
      return aEnable ? -1 : 1
    } else {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    }
  })
}
