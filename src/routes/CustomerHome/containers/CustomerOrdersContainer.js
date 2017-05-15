import { connect } from 'react-redux'
import { makeOrder, fetchAllCustomerOrders } from '../modules/orders'

import CustomerOrderList from '../components/CustomerOrderList'

const mapDispathToProps = {
  makeOrder,
  fetchAllCustomerOrders
}

const mapStateToProps = state => ({
  ...state.customerOrders
})

export default connect(mapStateToProps, mapDispathToProps)(CustomerOrderList)
