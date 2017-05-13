import React from 'react'
import PropTypes from 'prop-types'

import './BigDrink.scss'

const BigDrink = ({ name, description, img }) => {
  return (
    <div className='drink'>
      <img className='drink__image' src={img} alt={name} />
      <div className='drink__text'>
        <div className='drink__name'>{name}</div>
        <div className='drink__description'>{description}</div>
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
