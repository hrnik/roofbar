export const getDrinkById = state => drinkId => {
  const filteredDrinks = state.bar.drinks.filter(drink => drinkId === drink.id)
  return filteredDrinks[0]
}


export const getNameDrinkById = state => drinkId => {
  const drink = getDrinkById(state)(drinkId) || {}
  return drink.name || ''
}
