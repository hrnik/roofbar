import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'

import './BigDrink.scss'

const BigDrink = ({ name, description, img }) => {
  return (
    <div>
      <div className='drink'>
        <img className='drink__image' src={img} alt={name} />
        <div className='drink__text'>
          <div className='drink__name'>{name}</div>
          <div className='drink__description'>{description}</div>
        </div>
      </div>
      <div className='btn-order-wraper'>
        <Button fullWidth>Make order</Button>
      </div>
    </div>
  )
}

BigDrink.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string
}

export default BigDrink
