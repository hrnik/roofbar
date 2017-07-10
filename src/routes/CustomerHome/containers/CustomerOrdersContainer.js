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
import { fetchLimits } from 'store/bar'
import IconBtn from 'components/IconBtn'
import CustomerOrderList from '../components/CustomerOrderList'
import { getNameDrinkById, getDrinkById } from 'selectors/bar'

const notificationIconTitle =
  'https://res.cloudinary.com/dpgsnafcu/image/upload/c_scale,h_40/v1497019138/fde5d8d7dccb07ce0ed79c96cc44218e_i22gva.jpg'
const checkNotificationAvailable = () =>
  Notification && Notification.permission === 'granted'

const mapDispathToProps = {
  fetchAllCustomerOrders,
  fetchOrder,
  fetchLimits,
  notifySuccess,
  notifyWarning
}

const mapStateToProps = state => ({
  ...state.ordersStore,
  orders: state.ordersStore.orders.sort((a, b) => b.order_id - a.order_id),
  getNameDrinkById: getNameDrinkById(state),
  getDrinkById: getDrinkById(state)
})

class CustomerOrdersContainer extends React.Component {
  timeoutList = {};
  pollingOrders = [];

  componentWillMount () {
    this.checkProps(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const isEqualArray =
      this.props.pendingOrdersID.length === nextProps.pendingOrdersID.length &&
      this.props.pendingOrdersID.every(item =>
        nextProps.pendingOrdersID.includes(item)
      )
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

      const needPolling = props.pendingOrdersID.filter(
        item => !this.pollingOrders.includes(item)
      )
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
                const goodTitle = 'Your drink is ready!'
                const goodMessage =
                  'Cocktail is prepared and you can take him at the bar.'
                if (checkNotificationAvailable()) {
                  const goodNotification = new Notification(goodTitle, {
                    body: goodMessage,
                    icon: notificationIconTitle
                  })
                  console.log(goodNotification)
                } else {
                  this.props.notifySuccess({
                    // uid: 'once-please', // you can specify your own uid if required
                    title: goodTitle,
                    message: goodMessage,
                    position: 'tc',
                    autoDismiss: 0,
                    dismissible: true,
                    children: <IconBtn className='notification-msg' ok active />
                  })
                }
              }
              if (order.status === ORDER_STATUS_CANCELED) {
                this.props.fetchLimits()
                const badTitle = 'Your cocktail canot be prepared.'
                const badMessage = `Barmen don't have some ingredients, yoc can try order other coctail.`
                if (checkNotificationAvailable()) {
                  const badNotification = new Notification(badTitle, {
                    body: badMessage,
                    icon: notificationIconTitle
                  })
                  console.log(badNotification)
                } else {
                  this.props.notifyWarning({
                    // uid: 'once-please', // you can specify your own uid if required
                    title: badTitle,
                    message: badMessage,
                    position: 'tc',
                    autoDismiss: 0,
                    dismissible: true
                    // children: ( <IconBtn className='notification-msg' ok active></IconBtn>   )
                  })
                }
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
    return <CustomerOrderList {...this.props} />
  }
}

export default connect(mapStateToProps, mapDispathToProps)(
  CustomerOrdersContainer
)
