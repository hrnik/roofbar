import React from 'react'
import Dropdown from 'react-dropdown'
import Loader from 'components/Loader'
import './CommonBarmenView.scss'

const defaultRoutes = [{ value: '/barmen', label: 'Orders' }, { value: '/manage', label: 'Manage' }]

export const CommonBarmenView = ({ children, location, onSelect, isFetchingDrinks, isFetchingOrders }) => {
  const options = defaultRoutes.filter(option => option.value !== location.pathname)
  const placeholderOption = defaultRoutes.filter(option => option.value === location.pathname)[0] || defaultRoutes[0]
  return (
    <div>
      {!isFetchingDrinks && !isFetchingOrders
        ? <div className='customer-bar'>
          <div className='customer-bar__main '>
            <div className='container container--left barmen-view-top'>
              <h2 className='Dropdown--simple'>
                <Dropdown
                  options={options}
                  onChange={onSelect}
                  placeholder={placeholderOption.label}
                  className='Dropdown--simple'
                  />
              </h2>
              <div className='select'>Bar is Open</div>
            </div>
            {children}
          </div>
        </div>
        : <Loader absoluteCenter />}
    </div>
  )
}

export default CommonBarmenView
