import React from 'react'
import classNames from 'classnames'

import BarOrder from '../BarOrder'

import './BarOrdersView.scss'

export const BarOrdersView = ({
  completedOrders,
  pendingOrders,
  canceledOrders,
  getDrinkById,
  completeOrder,
  cancelOrder,
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
        <div className='orders-workplace__title-wrapper'>
          <h3 className='orders-workplace__titile'>New</h3>
          {pendingOrders.length > 0 && <h3
            className={classNames('orders-workplace__edit-mode', {
              'orders-workplace__edit-mode--normal': normalMode,
              'orders-workplace__edit-mode--decline': !normalMode
            })}
            onClick={() => toogleEditMode()}
          >
            {normalMode ? <span>Normal mode</span> : <span>Decline mode</span>}
          </h3>}
        </div>
        {pendingOrders.length > 0 &&
          pendingOrders.map(order => (
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
      </div>
      <div className='orders-workplace__done'>
        <h3 className='orders-workplace__titile'>Done</h3>
        {completedOrders.length > 0 &&
          completedOrders.map(order => (
            <BarOrder
              normalMode={normalMode}
              key={order.order_id}
              order={order}
              drink={getDrinkById(order.drink_id)}
              completeOrder={completeOrder}
              cancelOrder={cancelOrder}
            />
          ))}
      </div>
      <div className='orders-workplace__cancel'>
        <h3 className='orders-workplace__titile'>Declined</h3>
        <div className='canceled-order-list'>
          {canceledOrders.length > 0 &&
            canceledOrders.map(order => (
              <BarOrder
                normalMode={normalMode}
                key={order.order_id}
                order={order}
                drink={getDrinkById(order.drink_id)}
                completeOrder={completeOrder}
                cancelOrder={cancelOrder}
              />
            ))}
        </div>
      </div>
    </div>

  </div>
)

export default BarOrdersView
