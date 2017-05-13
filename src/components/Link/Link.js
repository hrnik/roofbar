import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router'
import classNames from 'classnames'

import './Link.scss'

const Link = ({ to, children, className }) => {
  return (
    <RouterLink to={to} className={classNames('link', className)}>
      {children}
    </RouterLink>
  )
}

Link.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  to: PropTypes.string
}

export default Link
