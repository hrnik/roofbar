import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import BigDrink from 'components/BigDrink'

import long from '../../assets/long.jpg'

import './CustomerBigDrinkList.scss'

const sliderDrinksSettings = {
  arrows: false,
  autoplay: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: '20px',
  touchThreshold: 10
}

const CustomerBigDrinkList = ({ drinks, activeCategoryName, makeOrder }) => {
  return (
    <div
      onTouchStart={() => {
        {
          /* document.body.classList.add('stop-scrolling')
         document.body.on('touchmove', e => e.preventDefault) */
        }
      }}
      onTouchEnd={() => {
        {
          /* document.body.classList.remove('stop-scrolling') */
        }
      }}
      onTouchMove={e => {
        e.preventDefault()
      }}
      className='drinks-list--big drinks-list--big'
    >
      {drinks.length > 0
        ? <Slider {...sliderDrinksSettings}>
          {drinks.filter(drink => drink.category === activeCategoryName).map((drink, index) => {
            return (
              <div data-index={index} key={index}>
                <BigDrink
                  drinkID={drink.drink_id}
                  name={drink.name}
                  img={long}
                  description={drink.description}
                  makeOrder={makeOrder}
                  />
              </div>
            )
          })}
        </Slider>
        : null}
    </div>
  )
}

CustomerBigDrinkList.propTypes = {}

export default CustomerBigDrinkList
