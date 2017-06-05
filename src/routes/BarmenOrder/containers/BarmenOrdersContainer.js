import { connect } from 'react-redux'
import { fetchAllCustomerOrders, completeOrder, cancelOrder, toogleEditMode } from 'store/orders'

import BarOrdersView from '../components/BarOrdersView'
import { getCompetedOrders, getPednignOrders, getCanceledOrders } from 'selectors/orders'
import { getNameDrinkById } from 'selectors/bar'

const mapDispatchToProps = {
  fetchAllCustomerOrders,
  completeOrder,
  cancelOrder,
  toogleEditMode
}

const mapStateToProps = state => ({
  ...state.barmenOrders,
  completedOrders : getCompetedOrders(state),
  canceledOrders : getCanceledOrders(state),
  pendingOrders: getPednignOrders(state),
  getNameDrinkById: getNameDrinkById(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(BarOrdersView)
