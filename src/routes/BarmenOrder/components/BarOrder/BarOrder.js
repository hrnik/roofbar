import React from 'react'
import { withState } from 'recompose'
import classNames from 'classnames'
import IconBtn from 'components/IconBtn'
import moment from 'moment'
import BarConfirmCanelModal from '../BarConfirmCanelModal'
import long from '../../assets/long.jpg'

import './BarOrder.scss'

export const BarOrder = ({
  order,
  drink,
  completeOrder,
  declineOrder,
  cancelOrder,
  normalMode,
  setOpenModalConfirm,
  isOpenModalConfirm
}) => {
  const isNew = order.status === 'PENDING'
  const isCompleted = order.status === 'DONE'
  const isCanceled = order.status === 'CANCELED'
  return (
    <div className='order-card'>
      <div className='order-card__info'>
        <img src={drink.photo || long} className='order-card__image' />
        <div className='ordec-card__description'>
          <div className='order-card__top'>
            <span
              className={classNames('order-card__status', {
                'order-card__status--new': isNew,
                'order-card__status--done': isCompleted,
                'order-card__status--cancel': isCanceled
              })}
            >
              {order.status}
            </span>
            <span className='order-card__time'>
              {moment(order.date).fromNow()}
            </span>
          </div>
          <div className='order-card__name'>{drink && drink.name}</div>
          <div className='order-card__code'>{order.order_code}</div>
        </div>
      </div>
      <div className='order-card__actions'>
        {isNew &&
          (normalMode
            ? <IconBtn
              disable={order.isProcessing}
              ok
              onAction={() => completeOrder(order.order_id)}
              />
            : <IconBtn cancel onAction={() => { setOpenModalConfirm(!isOpenModalConfirm) }} />)}
        {isCompleted && <IconBtn ok active />}
      </div>
      <BarConfirmCanelModal confirm={() => cancelOrder(order.order_id)} close={() => setOpenModalConfirm(false)} isOpen={isOpenModalConfirm} />
    </div>
  )
}

const enhance = withState('isOpenModalConfirm', 'setOpenModalConfirm', false)
export default enhance(BarOrder)
