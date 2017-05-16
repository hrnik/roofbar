import { connect } from 'react-redux'
import { makeOrder, fetchAllCustomerOrders } from '../modules/orders'

import CustomerOrderList from '../components/CustomerOrderList'

const mapDispathToProps = {
  fetchAllCustomerOrders
}

const mapStateToProps = state => ({
  ...state.customerOrders
})

export default connect(mapStateToProps, mapDispathToProps)(CustomerOrderList)
