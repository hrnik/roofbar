export const getDrinkById = state => drinkId => {
  const filteredDrinks = state.bar.drinks.filter(drink => drinkId === drink.id)
  return filteredDrinks[0]
}

export const getNameDrinkById = state => drinkId => {
  const drink = getDrinkById(state)(drinkId) || {}
  return drink.name || ''
}

export const sortDrinkByCategory = (drinks, categoryName) => {
  return drinks
    .filter(drink => drink.category === categoryName)
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      // a должно быть равным b
      return 0
    })
}
