import React from 'react'
import Modal from 'react-modal'

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
    left: '50%',
    right: '20px',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    boxShadow: '1px 4px 10px 0 rgba(0, 0, 0, 0.06)',
    maxWidth: '300px',
    borderRadius: '4px',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '20px'
  }
}

const BarModal = ({ isOpen, children }) =>
  <div>
    <Modal style={styles} isOpen={isOpen} contentLabel='Modal'>
      {children}
    </Modal>
  </div>

export default BarModal
