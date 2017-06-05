import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import { DRINK_STATUS_AVAILABLE } from 'store/bar'
import classNames from 'classnames'

import './BigDrink.scss'

const BigDrink = ({
  name,
  drinkId,
  description,
  img,
  processing,
  makeOrder,
  status,
  disableDrink,
  enableDrink,
  disableMode = false
}) => {
  const isDisableDrink = status !== DRINK_STATUS_AVAILABLE
  const editBtns = !isDisableDrink
    ? <Button disable={processing} black onClick={() => disableDrink(drinkId)} fullWidth>Decline</Button>
    : <Button disable={processing} onClick={() => enableDrink(drinkId)} fullWidth>Enable</Button>

  return (
    <div>
      <div className={classNames('drink', { 'drink--disable': isDisableDrink })}>
        <img className='drink__image' src={img} alt={name} />
        <div className='drink__text'>
          <div className='drink__name'>{name}</div>
          <div className='drink__description'>{description}</div>
        </div>
      </div>
      <div className='btn-order-wraper'>
        {!disableMode
          ? <Button disable={isDisableDrink || processing} onClick={() => makeOrder(drinkId)} fullWidth>
              Make order
            </Button>
          : editBtns}
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
