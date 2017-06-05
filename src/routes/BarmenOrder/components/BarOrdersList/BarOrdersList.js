import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import BarOrder from '../BarOrder'

const BarOrdersList = ({ list, completeOrder, cancelOrder, normalMode, getDrinkById, ...rest }) => (
  <CSSTransitionGroup transitionName='order-item' transitionEnterTimeout={500} transitionLeaveTimeout={300} {...rest}>
    {list.length > 0 &&
      list.map(order => (
        <div key={order.order_id}>
          <BarOrder
            normalMode={normalMode}
            order={order}
            drink={getDrinkById(order.drink_id)}
            completeOrder={completeOrder}
            cancelOrder={cancelOrder}
          />
        </div>
      ))}
  </CSSTransitionGroup>
)

export default BarOrdersList
