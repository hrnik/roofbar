import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import { DRINK_STATUS_AVAILABLE } from 'store/bar'
import classNames from 'classnames'
import CocktailImage from './assets/Cocktail.svg'

import './SmallDrink.scss'


const SmallDrink = ({
  name,
  drinkID,
  description,
  img,
  makeOrder,
  status,
  disableDrink,
  enableDrink
}) => {
  const isDisableDrink = status !== DRINK_STATUS_AVAILABLE
  return (
    <div className={classNames('small-drink', { 'small-drink--disable': isDisableDrink })}>
      <img className='small-drink__image' src={img} alt={name} />
      <div className='small-drink__text'>
        <div className='small-drink__name'>{name}</div>
        <div className='small-drink__description'>{description}</div>
      </div>
      <div>
        <Button className='small-drink-btn' disable={isDisableDrink} onClick={() => makeOrder(drinkID)} fullWidth>
          <img src={CocktailImage} width='11' height='21' />
        </Button>
      </div>
    </div>
  )
}

SmallDrink.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string
}

export default SmallDrink
