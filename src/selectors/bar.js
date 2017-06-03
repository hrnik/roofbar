export const getDrinkById = state => drinkID => {
  const filteredDrinks = state.bar.drinks.filter(drink => drinkID === drink.id)
  return filteredDrinks[0]
}
