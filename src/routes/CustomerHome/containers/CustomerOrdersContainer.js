import React from 'react'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux'

import { fetchOrder, fetchAllCustomerOrders, ORDER_STATUS_PENDING, ORDER_STATUS_DONE, ORDER_STATUS_CANCELED } from 'store/orders'
import { notifySuccess, notifyWarning } from 'store/notifications'
import IconBtn from 'components/IconBtn'
import CustomerOrderList from '../components/CustomerOrderList'


const mapDispathToProps = {
  fetchAllCustomerOrders,
  fetchOrder,
  notifySuccess,
  notifyWarning
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
    this.timeoutList = listID.map(id =>
      setTimeout(
        () =>
          this.props.fetchOrder(id).then(order => {
            if (order.status === ORDER_STATUS_DONE) {
              this.props.notifySuccess({
                // uid: 'once-please', // you can specify your own uid if required
                title: 'Your cocktail is ready!!',
                message: 'Cocktail is prepared and you can take him at the bar.',
                position: 'tc',
                autoDismiss: 0,
                dismissible: true,
                children: ( <IconBtn className='notification-msg' ok active></IconBtn>)
              })
            }
            if (order.status === ORDER_STATUS_CANCELED) {
              this.props.notifyWarning({
                // uid: 'once-please', // you can specify your own uid if required
                title: 'Your cocktail canot be prepared.',
                message: 'Barmen don\'t have some ingredients, yoc can try order other coctail.',
                position: 'tc',
                autoDismiss: 0,
                dismissible: true,
                //children: ( <IconBtn className='notification-msg' ok active></IconBtn>   )
              })
            }
          }),
        5000
      )
    )
  }

  render () {
    const { orders } = this.props
    return <CustomerOrderList orders={orders} />
  }
}

export default connect(mapStateToProps, mapDispathToProps)(CustomerOrdersContainer)
