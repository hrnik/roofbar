import React from 'react'
import PropTypes from 'prop-types'
// import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import NotificationContainer from 'containers/NotificationContainer'

export const CoreLayout = ({ children }) => (
  <div className='core-layout__viewport'>
    {children}
    <NotificationContainer />
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
