import { connect } from 'react-redux'
import { fetchAllCustomerOrders, completeOrder, canceledOrder, toogleEditMode } from 'store/orders'

import BarOrdersView from '../components/BarOrdersView'
import {getCompetedOrders, getPednignOrders, getCanceledOrders} from 'selectors/orders'

const mapDispathToProps = {
  fetchAllCustomerOrders,
  completeOrder,
  canceledOrder,
  toogleEditMode
}

const mapStateToProps = state => ({
  ...state.barmenOrders,
  completedOrders : getCompetedOrders(state),
  canceledOrders : getCanceledOrders(state),
  pendingOrders: getPednignOrders(state),
  getDrinkById: drinkID => {
    const filteredDrinks = state.bar.drinks.filter(drink => drinkID === drink.drink_id)
    return filteredDrinks[0]
  }
})

export default connect(mapStateToProps, mapDispathToProps)(BarOrdersView)
