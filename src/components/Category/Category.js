import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Category.scss'

const Category = ({ active = false, name, img, limit, drinked, className, onClick }) => {
  return (
    <div onClick={onClick} className={classNames(className, 'category', { 'category--active':active })}>
      <div className='category__image-wrapper'>
        <img className='category__image' src={img} alt={name} />
      </div>
      <div className='category__name'>{name}</div>
      <div className='category__limits'>{drinked + '/' + limit}</div>
    </div>
  )
}

Category.propTypes = {
  name:PropTypes.string,
  img:PropTypes.string,
  drinked:PropTypes.number,
  active:PropTypes.bool,
  limit:PropTypes.number
}

export default Category

