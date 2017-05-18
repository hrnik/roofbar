import { connect } from 'react-redux'
import { fetchAllCustomerOrders, completeOrder, canceledOrder } from 'store/orders'

import BarOrdersView from '../components/BarOrdersView'

const mapDispathToProps = {
  fetchAllCustomerOrders,
  completeOrder,
  canceledOrder
}

const mapStateToProps = state => ({
  ...state.customerOrders,
  getDrinkById: drinkID => {
    const filteredDrinks = state.bar.drinks.filter(drink => drinkID === drink.drink_id)
    return filteredDrinks[0]
  }
})

export default connect(mapStateToProps, mapDispathToProps)(BarOrdersView)
