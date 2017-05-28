import React from 'react'
import './CommonBarmenView.scss'

export const CommonBarmenView = ({ children, location }) => (
  <div className='customer-bar'>
    <div className='customer-bar__main '>
      <div className='container container--left barmen-view-top'>
        <h2>{location.pathname}</h2>
        <div className='select'>Bar is Open</div>
      </div>
      {children}
    </div>
  </div>
)

export default CommonBarmenView
