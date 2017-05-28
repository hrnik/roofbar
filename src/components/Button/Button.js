import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Button.scss'

const Button = ({ fullWidth, children, onClick, blue, black, disable }) => {
  return (
    <button onClick={!disable && onClick} className={classNames('btn', { 'btn--block': fullWidth, 'btn--blue': blue, 'btn--black': black,  'btn--disable': disable })}>
      {children}
    </button>
  )
}

Button.propTypes = {
  fullWidth: PropTypes.bool,
  children: PropTypes.any
}

export default Button
