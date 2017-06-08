import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'

import { ORDER_STATUS_CANCELED, ORDER_STATUS_DONE } from 'store/orders'

import './OwnOrder.scss'

const OwnOrder = ({ name, img, code, status, active, date }) => {
  return (
    <div className='own-order'>
      <div className='own-order__info'>
        <img src={img} className='own-order__image' />
        <div className='own-order__description'>
          <div className='own-order__name'>{name} </div>
          <div className='own-order__code'>{code}</div>
          <div className='own-order__date'> { moment(date).fromNow() }</div>
        </div>
      </div>

      <div
        className={classNames('own-order__status', {
          'own-order__status--completed': status === ORDER_STATUS_DONE,
          'own-order__status--canceled': status === ORDER_STATUS_CANCELED
        })}
      >
        {status}
      </div>
    </div>
  )
}

OwnOrder.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  code: PropTypes.string,
  status: PropTypes.string,
  date: PropTypes.string,
  active: PropTypes.bool
}

export default OwnOrder
