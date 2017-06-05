import React from 'react'
import { connect } from 'react-redux'

import {
  fetchOrder,
  fetchAllCustomerOrders,
  ORDER_STATUS_DONE,
  ORDER_STATUS_CANCELED,
  ORDER_STATUS_PENDING
} from 'store/orders'
import { notifySuccess, notifyWarning } from 'store/notifications'
import IconBtn from 'components/IconBtn'
import CustomerOrderList from '../components/CustomerOrderList'
import { getNameDrinkById } from 'selectors/bar'

const mapDispathToProps = {
  fetchAllCustomerOrders,
  fetchOrder,
  notifySuccess,
  notifyWarning
}

const mapStateToProps = state => ({
  ...state.customerOrders,
  orders: state.customerOrders.orders.sort((a, b) => a.order_id - b.order_id).reverse(),
  getNameDrinkById: getNameDrinkById(state)
})

class CustomerOrdersContainer extends React.Component {
  timeoutList = {}
  pollingOrders = []

  componentWillMount () {
    this.checkProps(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const isEqualArray =
      this.props.pendingOrdersID.length === nextProps.pendingOrdersID.length &&
      this.props.pendingOrdersID.every(item => nextProps.pendingOrdersID.includes(item))
    if (!isEqualArray) {
      this.checkProps(nextProps)
    }
  }

  componentWillUnmount () {
    Object.values(this.timeoutList).map(value => clearTimeout(value))
  }

  checkProps (props) {
    if (props.pendingOrdersID.length > 0) {
      // if (this.timeoutList) {
      //   this.timeoutList.map(timeout => clearTimeout(timeout))
      // }
      console.log('this.timeoutList', this.timeoutList)
      console.log('props.pendingOrdersID', props.pendingOrdersID)
      // Optionally do something with data

      const needPolling = props.pendingOrdersID.filter(item => !this.pollingOrders.includes(item))
      this.startPoll(needPolling)
    }
  }

  startPoll (listID) {
    let self = this
    listID.map(id => {
      self.pollingOrders.push(id)
      const poll = () => {
        return setTimeout(
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
                  children: <IconBtn className='notification-msg' ok active />
                })
              }
              if (order.status === ORDER_STATUS_CANCELED) {
                this.props.notifyWarning({
                  // uid: 'once-please', // you can specify your own uid if required
                  title: 'Your cocktail canot be prepared.',
                  message: "Barmen don't have some ingredients, yoc can try order other coctail.",
                  position: 'tc',
                  autoDismiss: 0,
                  dismissible: true
                  // children: ( <IconBtn className='notification-msg' ok active></IconBtn>   )
                })
              }
              if (order.status === ORDER_STATUS_PENDING) {
                const timeoutId = poll()
                self.timeoutList[id] = timeoutId
              }
            }),
          2000
        )
      }
      const timeoutId = poll()
      self.timeoutList[id] = timeoutId
    })
  }

  render () {
    const { orders, getNameDrinkById } = this.props
    return <CustomerOrderList orders={orders} getNameDrinkById={getNameDrinkById} />
  }
}

export default connect(mapStateToProps, mapDispathToProps)(CustomerOrdersContainer)
