import React from 'react'
import { connect } from 'react-redux'
import { makeOrder } from 'store/orders'
import { fetchLimits } from 'store/bar'
import { notifySuccess, notifyWarning } from 'store/notifications'
import IconBtn from 'components/IconBtn'

import CustomerBigDrinkList from '../components/CustomerBigDrinkList'

const mapDispathToProps = {
  makeOrder,
  fetchLimits,
  notifySuccess,
  notifyWarning
}

const mapStateToProps = state => ({
  ...state.bar,
  ...state.customerOrders
})

class CustomerOrdersContainer extends React.Component {
  makeOrderWithNotify = undefined
  componentWillMount () {
    this.makeOrderWithNotify = drinkId => {
      return this.props.makeOrder(drinkId).then(
        success => {
          this.props.fetchLimits()
          this.props.notifySuccess({
            // uid: 'once-please', // you can specify your own uid if required
            title: 'Your order created!',
            message: 'The cocktail will be prepared and we will inform you.',
            position: 'tc',
            autoDismiss: 0,
            dismissible: true,
            children: <IconBtn className='notification-msg' ok active />
          })
        },
        () => {
          this.props.notifyWarning({
            // uid: 'once-please', // you can specify your own uid if required
            title: 'Was wrong(',
            message: 'Your order not created.',
            position: 'tc',
            autoDismiss: 0,
            dismissible: true
            // children: ( <IconBtn className='notification-msg' ok active></IconBtn>   )
          })
        }
      )
    }
  }

  render () {
    const { makeOrder, ...restProps } = this.props
    return <CustomerBigDrinkList makeOrder={this.makeOrderWithNotify} {...restProps} />
  }
}

export default connect(mapStateToProps, mapDispathToProps)(CustomerOrdersContainer)
