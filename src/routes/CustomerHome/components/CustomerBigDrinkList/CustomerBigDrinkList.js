import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import MediaQuery from 'react-responsive'
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

const CustomerBigDrinkList = ({ drinks, activeCategoryName, makeOrder, makingOrders, disabledCategories }) => {
  const disableCategory = disabledCategories[activeCategoryName]
  return (
    <div>
      <MediaQuery query='(max-width: 768px)'>
        <div
          onTouchMove={e => {
            e.preventDefault()
          }}
          className='drinks-list--big'
        >
          {drinks.length > 0
            ? <Slider {...sliderDrinksSettings}>
              {drinks
                  .filter(drink => drink.category === activeCategoryName)
                  .map((drink, index) => {
                    return (
                      <div data-index={index} key={index}>
                        <BigDrink
                          processing={makingOrders[drink.id]}
                          drinkId={drink.id}
                          name={drink.name}
                          disable={disableCategory}
                          img={long}
                          description={drink.description}
                          makeOrder={makeOrder}
                          status={drink.status}
                        />
                      </div>
                    )
                  })}
            </Slider>
            : null}
        </div>
      </MediaQuery>
      <MediaQuery query='(min-width: 768px)'>
        <div className='drinks-list'>
          {drinks
            .filter(drink => drink.category === activeCategoryName)
            .map((drink, index) => {
              return (
                <div data-index={index} key={index} className='drinks-list__item'>
                  <BigDrink
                    processing={makingOrders[drink.id]}
                    drinkId={drink.id}
                    name={drink.name}
                    img={long}
                    disable={disableCategory}
                    description={drink.description}
                    makeOrder={makeOrder}
                    status={drink.status}
                  />
                </div>
              )
            })}
        </div>
      </MediaQuery>
    </div>
  )
}

CustomerBigDrinkList.propTypes = {}

export default CustomerBigDrinkList
