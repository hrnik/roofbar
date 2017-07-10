import React from 'react'
import Dropdown from 'react-dropdown'
import Loader from 'components/Loader'
import './CommonBarmenView.scss'
import { BAR_STATUS_OPENED, BAR_STATUS_CLOSED } from 'store/bar'

const defaultRoutes = [{ value: '/barmen', label: 'Orders' }, { value: '/manage', label: 'Manage' }]
const barStatusValue = [{ value: BAR_STATUS_OPENED, label: 'Open' }, { value: BAR_STATUS_CLOSED, label: 'Close' }]
const getStringStatusBarFromBoolean = isClosed => (isClosed ? BAR_STATUS_CLOSED : BAR_STATUS_OPENED)

export const CommonBarmenView = ({
  children,
  location,
  onSelect,
  isFetchingDrinks,
  isFetchingOrders,
  openBar,
  closeBar,
  barClosed
}) => {
  const options = defaultRoutes.filter(option => option.value !== location.pathname)
  const placeholderOption = defaultRoutes.filter(option => option.value === location.pathname)[0] || defaultRoutes[0]

  const barStatusValueFiltered = barStatusValue.filter(
    option => option.value !== getStringStatusBarFromBoolean(barClosed)
  )

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
              <Dropdown
                options={barStatusValueFiltered}
                onChange={option => {
                  if (option.value === BAR_STATUS_OPENED) {
                    openBar()
                  } else {
                    closeBar()
                  }
                }}
                placeholder={`Bar is ${barClosed ? 'closed' : 'open'}`}
                />
            </div>
            {children}
          </div>
        </div>
        : <Loader absoluteCenter />}
    </div>
  )
}

export default CommonBarmenView
