import React from 'react'
import classNames from 'classnames'

import BarOrdersList from '../BarOrdersList'

import './BarOrdersView.scss'

export const BarOrdersView = ({
  completedOrders,
  pendingOrders,
  canceledOrders,
  completeOrder,
  cancelOrder,
  toogleEditMode,
  normalMode,
  orders,
  children,
  getDrinkById
}) => (
  <div className='container orders-workplace'>
    <div className='orders-workplace__new'>
      <div className='orders-workplace__title-wrapper'>
        <h3 className='orders-workplace__titile'>New</h3>
        {pendingOrders.length > 0 &&
          <h3
            className={classNames('orders-workplace__edit-mode', {
              'orders-workplace__edit-mode--normal': normalMode,
              'orders-workplace__edit-mode--decline': !normalMode
            })}
            onClick={toogleEditMode}
          >
            {normalMode ? <span>Normal mode</span> : <span>Decline mode</span>}
          </h3>}
      </div>
      <BarOrdersList
        list={pendingOrders}
        normalMode={normalMode}
        completeOrder={completeOrder}
        cancelOrder={cancelOrder}
        getDrinkById={getDrinkById}
      />
    </div>
    <div className='orders-workplace__done'>
      <h3 className='orders-workplace__titile'>Done</h3>
      <BarOrdersList
        list={completedOrders}
        normalMode={normalMode}
        completeOrder={completeOrder}
        cancelOrder={cancelOrder}
        getDrinkById={getDrinkById}
      />
    </div>
    <div className='orders-workplace__cancel'>
      <h3 className='orders-workplace__titile'>Declined</h3>
      <BarOrdersList
        list={canceledOrders}
        normalMode={normalMode}
        completeOrder={completeOrder}
        cancelOrder={cancelOrder}
        getDrinkById={getDrinkById}
        component='div'
        className='canceled-order-list'
      />
    </div>
  </div>
)

export default BarOrdersView
