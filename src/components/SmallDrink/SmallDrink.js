import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import { DRINK_STATUS_AVAILABLE } from 'store/bar'
import classNames from 'classnames'
import { withHandlers, compose } from 'recompose'
import CocktailImage from './assets/Cocktail.svg'

import './SmallDrink.scss'


const SmallDrink = ({
  name,
  drinkId,
  description,
  img,
  makeOrder,
  onClick,
  status,
  disableDrink,
  enableDrink
}) => {
  const isDisabledDrink = status !== DRINK_STATUS_AVAILABLE
  return (
    <div className={classNames('small-drink', { 'small-drink--disable': isDisabledDrink })}>
      <img className='small-drink__image' src={img} alt={name} />
      <div className='small-drink__text'>
        <div className='small-drink__name'>{name}</div>
        <div className='small-drink__description'>{description}</div>
      </div>
      <div className='small-drink__btn-wrapper'>
        <Button className='small-drink-btn' disable={isDisabledDrink} onClick={onClick} fullWidth>
          <img src={CocktailImage} width='11' height='21' />
        </Button>
      </div>
    </div>
  )
}

SmallDrink.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
}

const enchance = compose(
  withHandlers({
    onClick: props => () => props.makeOrder(props.drinkId)
  })
)

export default enchance(SmallDrink)
