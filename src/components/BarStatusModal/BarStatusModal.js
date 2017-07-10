import React from 'react'

import Modal from 'react-modal'

import iconClock from './Clock.svg'
import './BarStatusModal.scss'

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(49, 49, 49, 0.9)'
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '20px',
    right: '20px',
    bottom: 'auto',
    transform: 'translateY(-50%)',
    border: 'none',
    boxShadow: '1px 4px 10px 0 rgba(0, 0, 0, 0.06)',
    borderRadius: '4px',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '20px'
  }
}

const BarStatusModal = ({ barClosed }) =>
  <div>
    <Modal style={styles} isOpen={barClosed} contentLabel='Modal'>
      <div className='barStatus'>
        <h2 className='barStatus__title'>Bar is closed</h2>
        <div className='barStatus__description'>
          The barmen has closed the bar, so you can’t place an order for now. We will inform you of any changes
          {' '}
        </div>
        <img src={iconClock} alt='Icon clock' width='42px' height='56px' />
        <div className='barStatus__workHours'>9am - 5pm</div>
        <div> Working hours</div>
      </div>
    </Modal>
  </div>

export default BarStatusModal
