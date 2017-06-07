import { connect } from 'react-redux'
import { makeOrder } from 'store/orders'
import { fetchLimits } from 'store/bar'
import { notifySuccess, notifyWarning } from 'store/notifications'
import makeOrderWithNotification from 'hoc/makeOrderWithNotification'

import AllDrinks from '../components/AllDrinks'

const mapDispathToProps = {
  makeOrder,
  fetchLimits,
  notifySuccess,
  notifyWarning
}

const mapStateToProps = state => ({
  ...state.bar,
  ...state.ordersStore
})

export default connect(mapStateToProps, mapDispathToProps)(makeOrderWithNotification(AllDrinks))
