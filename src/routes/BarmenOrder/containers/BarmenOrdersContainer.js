import React from 'react'
import { connect } from 'react-redux'
import { fetchAllCustomerOrders, completeOrder, cancelOrder, toogleEditMode } from 'store/orders'

import BarOrdersView from '../components/BarOrdersView'
import { getCompetedOrders, getPednignOrders, getCanceledOrders } from 'selectors/orders'
import { getDrinkById } from 'selectors/bar'

const mapDispatchToProps = {
  fetchAllCustomerOrders,
  completeOrder,
  cancelOrder,
  toogleEditMode
}

const mapStateToProps = state => ({
  ...state.barmenOrders,
  completedOrders: getCompetedOrders(state),
  canceledOrders: getCanceledOrders(state),
  pendingOrders: getPednignOrders(state),
  getDrinkById: getDrinkById(state)
})

class CustomerOrdersContainer extends React.Component {
  pollTimeout = undefined

  componentWillMount () {
    const self = this
    const poll = () => {
      return setTimeout(() => {
        self.props.fetchAllCustomerOrders().then(() => {
          poll()
        })
      }, 5000)
    }
    this.pollTimeout = poll()
  }

  componentWillUnmount () {
    clearTimeout(this.pollTimeout)
  }

  render () {
    return <BarOrdersView {...this.props} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersContainer)
