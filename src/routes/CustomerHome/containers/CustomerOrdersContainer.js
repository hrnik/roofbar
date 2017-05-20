import React from 'react'
import { connect } from 'react-redux'
import { fetchOrder, fetchAllCustomerOrders, ORDER_STATUS_PENDING } from 'store/orders'

import CustomerOrderList from '../components/CustomerOrderList'

const mapDispathToProps = {
  fetchAllCustomerOrders,
  fetchOrder
}

const mapStateToProps = state => ({
  ...state.customerOrders
})

class CustomerOrdersContainer extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.pendingOrdersID.length > 0) {
      console.log('allo', new Date())

      if (this.timeoutList) {
        this.timeoutList.map(timeout => clearTimeout(timeout))
      }
      // Optionally do something with data

      this.startPoll(nextProps.pendingOrdersID)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  startPoll (listID) {
    this.timeoutList = listID.map(id => setTimeout(() => this.props.fetchOrder(id).then(order => {
      if(order.status !== ORDER_STATUS_PENDING) {
        console.log('DONNNNNNEE', order.order_id)
      }
    }), 3000))
  }

  render () {
    const { orders } = this.props
    return <CustomerOrderList orders={orders} />
  }
}

export default connect(mapStateToProps, mapDispathToProps)(CustomerOrdersContainer)
