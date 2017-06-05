import React from 'react'
import classNames from 'classnames'

const IconBtn = ({ ok, cancel, active, onAction, className }) => {
  const okIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      x='0px'
      y='0px'
      viewBox='0 0 50 50'
      className={classNames('icon-btn', 'icon-btn--normal', {
        'icon-btn--active': active
      })}
    >
      <path
        d='M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 34.0625 14.46875 L 23.125 31.46875 L 15.78125 24.84375 L 14.4375 26.34375 L 22.625 33.75 L 23.5 34.53125 L 24.125 33.53125 L 35.75 15.53125 L 34.0625 14.46875 z'
        color='#000'
        overflow='visible'
      />
    </svg>
  )
  const cancelIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.0'
      x='0px'
      y='0px'
      viewBox='0 0 50 50'
      className={classNames('icon-btn', 'icon-btn--decline')}
    >
      <path
        d='M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.40625 15.46875 A 1.0001 1.0001 0 0 0 16.28125 15.5 A 1.0001 1.0001 0 0 0 15.78125 17.21875 L 23.5625 25 L 15.78125 32.78125 A 1.016466 1.016466 0 1 0 17.21875 34.21875 L 25 26.4375 L 32.78125 34.21875 A 1.016466 1.016466 0 1 0 34.21875 32.78125 L 26.4375 25 L 34.21875 17.21875 A 1.0001 1.0001 0 0 0 33.375 15.5 A 1.0001 1.0001 0 0 0 32.78125 15.78125 L 25 23.5625 L 17.21875 15.78125 A 1.0001 1.0001 0 0 0 16.40625 15.46875 z'
        color='#000'
        overflow='visible'
        fontFamily='Sans'
      />
    </svg>
  )
  return (
    <div className={className}  onClick={onAction}>
      {ok && okIcon}
      {cancel && cancelIcon}
    </div>
  )
}

export default IconBtn
