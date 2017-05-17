import React from 'react'

import Link from 'components/Link'

import './BarOrdersView.scss'

export const BarOrdersView = ({ orders, getDrinkById }) => (
  <div className='barmen-container'>
    <div className='container'>
      <h2>Order</h2>
    </div>
    <div className='orders-workplace'>
      <div className='orders-workplace__new'>
        {orders.length > 0 && orders.map(order => <div> {getDrinkById(order.drink_id).name}</div>)}
      </div>
      <div className='orders-workplace__done_' />
      <div className='orders-workplace__cacnel' />
    </div>

  </div>
)

export default BarOrdersView
