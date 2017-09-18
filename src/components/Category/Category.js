import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withHandlers, compose } from 'recompose'
import './Category.scss'

const Category = ({ active = false, name, img, limit, drinked, className, setActiveCategory, onClick }) => {
  return (
    <div onClick={onClick} className={classNames(className, 'category', { 'category--active':active })}>
      <div className='category__image-wrapper'>
        <img className='category__image' src={img} alt={name} />
      </div>
      <div className='category__name'>{name}</div>
      {limit && <div className={classNames('category__limits', {
        'category__limits--wrong' : limit.daily_done === limit.daily_limit
      })}>{limit.daily_done}/{limit.daily_limit}</div>}
    </div>
  )
}

Category.propTypes = {
  name    : PropTypes.string,
  img     : PropTypes.string,
  drinked : PropTypes.number,
  active  : PropTypes.bool,
  limit   : PropTypes.object
}

const enchance = compose(
  withHandlers({
    onClick: props => () => props.setActiveCategory(props.name)
  })
)

export default enchance(Category)

