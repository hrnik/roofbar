import { connect } from 'react-redux'
import { fetchAllCustomerOrders } from 'store/orders'

import BarOrdersView from '../components/BarOrdersView'

const mapDispathToProps = {
  fetchAllCustomerOrders
}

const mapStateToProps = state => ({
  ...state.customerOrders,
  getDrinkById: drinkID => {
    const filteredDrinks = state.bar.drinks.filter(drink => drinkID === drink.id)
    return filteredDrinks[0]
  }
})

export default connect(mapStateToProps, mapDispathToProps)(BarOrdersView)
