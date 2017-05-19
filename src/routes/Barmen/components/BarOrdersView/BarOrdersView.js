import React from 'react'
import classNames from 'classnames'

import BarOrder from '../BarOrder'

import './BarOrdersView.scss'

export const BarOrdersView = ({
  completedOrders,
  pendingOrders,
  getDrinkById,
  completeOrder,
  canceledOrders,
  toogleEditMode,
  normalMode,
  orders
}) => (
  <div className='barmen-container'>
    <div className='container order-view-top'>
      <h2>Order</h2>
      <div className='select'>Bar is Open</div>
    </div>
    <div className='container orders-workplace'>
      <div className='orders-workplace__new'>
        <div>
          <h3 className='orders-workplace__titile'>New</h3>
          <div onClick={() => toogleEditMode() }>
            {normalMode ? (
              <span>Normal mode</span>
            ) : (
              <span>Decline mode</span>
            )}
          </div>
        </div>
        {pendingOrders.length > 0 &&
          pendingOrders.map(order => (
            <div key={order.order_id}>
              <BarOrder order={order} drink={getDrinkById(order.drink_id)} completeOrder={completeOrder} />
            </div>
          ))}
      </div>
      <div className='orders-workplace__done'>
        <h3 className='orders-workplace__titile'>Done</h3>
        {completedOrders.length > 0 &&
          completedOrders.map(order => (
            <BarOrder key={order.order_id} order={order} drink={getDrinkById(order.drink_id)} completeOrder={completeOrder} />
          ))}
      </div>
      <div className='orders-workplace__cancel'>
        <h3 className='orders-workplace__titile'>Declined</h3>
        {canceledOrders.length > 0 &&
          canceledOrders.map(order => (
            <BarOrder key={order.order_id} order={order} drink={getDrinkById(order.drink_id)} completeOrder={completeOrder} />
          ))}

      </div>
    </div>

  </div>
)

export default BarOrdersView
