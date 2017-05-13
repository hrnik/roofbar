import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './CustomerHomeView.scss'

export const CustomerHomeView = () => (
  <div>
    <div className='container container--left'>
      <h2>Order</h2>
    </div>

    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
  </div>
)

export default CustomerHomeView
