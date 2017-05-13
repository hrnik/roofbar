import React from 'react'
import PropTypes from 'prop-types'
import './ListTitle.scss'

const ListTitle = ({ number, type, count }) => {
  return (
    <div className='list-title'>
      <span className='list-title__number'>{number}</span>
      <div className='list-title__name'>
        <span>{type} </span>
        <span className='list-title__count'>{count}</span>
      </div>
    </div>
  )
}

ListTitle.propTypes = {
  number:PropTypes.number,
  type:PropTypes.string,
  count:PropTypes.number
}

export default ListTitle
