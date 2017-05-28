import React from 'react'
import './CommonBarmenView.scss'
import Dropdown from 'react-dropdown'
import { browserHistory } from 'react-router'

const defaultRoutes = [{ value: '/barmen', label: 'Orders' }, { value: '/manage', label: 'Manage' }]


export const CommonBarmenView = ({ children, location }) => {
  const onSelect = option => {
    browserHistory.push(option.value)
  }
  const options = defaultRoutes.filter(option => option.value !== location.pathname)
  const placeholderOption = defaultRoutes.filter(option => option.value === location.pathname)[0] || defaultRoutes[0]
  return (
    <div className='customer-bar'>
      <div className='customer-bar__main '>
        <div className='container container--left barmen-view-top'>
          <h2 className='Dropdown--simple'>
            <Dropdown options={options} onChange={onSelect} placeholder={placeholderOption.label} className='Dropdown--simple' />
          </h2>
          <div className='select'>Bar is Open</div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CommonBarmenView
