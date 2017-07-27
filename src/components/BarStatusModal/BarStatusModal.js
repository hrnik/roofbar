import React from 'react'
import BarModal from 'components/BarModal'

import iconClock from './Clock.svg'
import './BarStatusModal.scss'

const BarStatusModal = ({ barClosed }) =>
  <BarModal isOpen={barClosed}>
    <div className='barStatus'>
      <h2 className='barStatus__title'>Bar is closed</h2>
      <div className='barStatus__description'>
          The barmen has closed the bar, so you can’t place an order for now. We will inform you of any changes (no)
          {' '}
      </div>
      <img src={iconClock} alt='Icon clock' width='42px' height='56px' />
      <div className='barStatus__workHour-container'>
        <div className='barStatus__workHours'>10:00 - 14:00 </div>
        <div className='barStatus__workHours'>15:00 - 17:00</div>
      </div>

      <div> Working hours</div>
    </div>
  </BarModal>

export default BarStatusModal
