export const getDrinkById = state => drinkId => {
  const filteredDrinks = state.bar.drinks.filter(drink => drinkId === drink.id)
  return filteredDrinks[0]
}
