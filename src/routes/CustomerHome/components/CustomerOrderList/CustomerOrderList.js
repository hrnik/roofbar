import React from 'react'
import PropTypes from 'prop-types'
import OwnOrder from 'components/OwnOrder'

import long from '../../assets/long.jpg'

const CustomerOrderList = ({ orders }) => {
  return (
    <div className='order-list'>
      {orders.length > 0 &&
        orders.map(item => {
          return <OwnOrder name='Long island iced tea' img={long} code={item.order_code} status={item.status} active={item.status === 'PENDING'} />
        })}
    </div>
  )
}

CustomerOrderList.propTypes = {
  orders: PropTypes.array
}

export default CustomerOrderList
