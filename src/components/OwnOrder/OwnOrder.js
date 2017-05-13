import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './OwnOrder.scss'

const OwnOrder = ({ name, img, code, status, active }) => {
  return (
    <div className='own-order'>
      <div className='own-order__info'>
        <img src={img} className='own-order__image' />
        <div className='own-order__description'>
          <div className='own-order__name'>{name}</div>
          <div className='own-order__code'>{code}</div>
        </div>
      </div>
      <div className={classNames('own-order__status', { 'own-order__status--active':active })}>{status}</div>
    </div>
  )
}

OwnOrder.propTypes = {
  name:PropTypes.string,
  img:PropTypes.string,
  code:PropTypes.string,
  status:PropTypes.string,
  date:PropTypes.string,
  active: PropTypes.bool
}

export default OwnOrder
