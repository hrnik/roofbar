import React from 'react'
import classNames from 'classnames'
import IconBtn from 'components/IconBtn'

import long from '../../assets/long.jpg'

import './BarOrder.scss'

export const BarOrder = ({ order, drink, completeOrder, declineOrder, cancelOrder, normalMode }) => {
  const isNew = order.status === 'PENDING'
  const isCompleted = order.status === 'DONE'
  const isCanceled = order.status === 'CANCELED'
  return (
    <div className='order-card'>
      <div className='order-card__info'>
        <img src={long} className='order-card__image' />
        <div className='ordec-card__description'>
          <div
            className={classNames('order-card__status', {
              'order-card__status--new': isNew,
              'order-card__status--done': isCompleted,
              'order-card__status--cancel': isCanceled
            })}
          >
            {order.status}
          </div>
          <div className='order-card__name'>{drink && drink.name}</div>
          <div className='order-card__code'>{order.order_code}</div>
        </div>
      </div>
      <div className='order-card__actions'>
        {isNew && (normalMode
          ? <IconBtn ok onAction={() => completeOrder(order.order_id)} />
          : <IconBtn cancel onAction={() => cancelOrder(order.order_id)} />)}
        {isCompleted && <IconBtn ok active />}
      </div>
    </div>
  )
}

export default BarOrder
