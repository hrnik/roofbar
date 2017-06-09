import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import OwnOrder from 'components/OwnOrder'

import './CustomerOrderList.scss'
import long from '../../assets/long.jpg'

const CustomerOrderList = ({ orders, getNameDrinkById, getDrinkById }) => {
  return (
    <div className='order-list'>
      <CSSTransitionGroup transitionName='own-order' transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {orders.length > 0 &&
          orders.map(item => {
            const drink = getDrinkById(item.drink_id) || {}
            return (
              <OwnOrder
                key={item.order_id}
                name={drink.name}
                img={drink.photo || long}
                date={item.date}
                code={item.order_code}
                status={item.status}
              />
            )
          })}
      </CSSTransitionGroup>
    </div>
  )
}

CustomerOrderList.propTypes = {
  orders: PropTypes.array
}

export default CustomerOrderList
