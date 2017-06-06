import React from 'react'
import classNames from 'classnames'
import './Loader.scss'

const Loader = ({ absoluteCenter }) => {
  return (
    <div className={classNames('spinner', { 'absoulte-center': absoluteCenter })}>
      <div className='cube1' />
      <div className='cube2' />
    </div>
  )
}

export default Loader
