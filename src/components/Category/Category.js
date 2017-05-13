import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Category.scss'

const Category = ({ name, img, limit, drinked, className }) => {
  return (
    <div className={classNames(className, 'category')}>
      <div className="category__image-wrapper">
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
  limit:PropTypes.number
}

export default Category

