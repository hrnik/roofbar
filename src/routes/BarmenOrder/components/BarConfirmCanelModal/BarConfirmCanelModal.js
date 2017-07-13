import React from 'react'
import BarModal from 'components/BarModal'
import Button from 'components/Button'
import  './BarConfirmCanelModal.css'

const BarConfirmCanelModal = ({ isOpen, confirm, close }) =>
  <BarModal isOpen={isOpen}>
    <div className='barStatus'>
      <h2 className='barStatus__title'>This order will be canceled!</h2>
      <h2 className='barStatus__title'>Do you sure?</h2>
      <Button className='btn__confirm' black onClick={confirm}>Cancel This drink</Button>
      <Button className='btn__confirm' onClick={close}>Not cancel</Button>
    </div>
  </BarModal>

export default BarConfirmCanelModal
