import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import MediaQuery from 'react-responsive'
import BigDrink from 'components/BigDrink'
import ReactSwipe from 'react-swipe'
import { sortDrinkByCategory } from 'selectors/bar'

import long from '../../assets/long.jpg'

import './CustomerBigDrinkList.scss'

let sliderDrinksSettings = {
  arrows: false,
  autoplay: false,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: '20px',
  touchThreshold: 10
}
sliderDrinksSettings = {}

const CustomerBigDrinkList = ({
  drinks,
  activeCategoryName,
  makeOrder,
  makingOrders,
  disabledCategories
}) => {
  const disableCategory = disabledCategories[activeCategoryName]
  return (
    <div>
      <MediaQuery query='(max-width: 767px)'>
        <div className='container drinks-list--big'>
          {drinks.length > 0
            ? <ReactSwipe
              className='carousel'
              key={activeCategoryName}
              {...sliderDrinksSettings}
              >
              {sortDrinkByCategory(
                  drinks,
                  activeCategoryName
                ).map((drink, index) => {
                  return (
                    <div data-index={index} key={index}>
                      <BigDrink
                        processing={makingOrders[drink.id]}
                        drinkId={drink.id}
                        name={drink.name}
                        disable={disableCategory}
                        img={drink.photo || long}
                        description={drink.description}
                        makeOrder={makeOrder}
                        status={drink.status}
                      />
                    </div>
                  )
                })}
            </ReactSwipe>
            : null}
        </div>
      </MediaQuery>
      <MediaQuery query='(min-width: 767px)'>
        <div className='drinks-list'>
          {sortDrinkByCategory(
            drinks,
            activeCategoryName
          ).map((drink, index) => {
            return (
              <div data-index={index} key={index} className='drinks-list__item'>
                <BigDrink
                  processing={makingOrders[drink.id]}
                  drinkId={drink.id}
                  name={drink.name}
                  img={drink.photo || long}
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
