import React from 'react'
import ListTitle from 'components/ListTitle'
import Category from 'components/Category'
import Slider from 'react-slick'
import MediaQuery from 'react-responsive'

import CocktailImage from './assets/Cocktail.svg'
import JuiceImage from './assets/Juice.svg'
import SmoothieImage from './assets/Smoothie.svg'

import './CategorySection.scss'

const mapCategoryImage = {
  Alchocol: CocktailImage,
  Beer: CocktailImage,
  Juice: JuiceImage,
  Smoothie: SmoothieImage
}

const getSliderSettings = length => ({
  infinite: false,
  arrows: false,
  swipe:true,
  slidesToShow: length,
  swipeToSlide: true,
  mobileFirst:true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: length
      }
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 330,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 3
      }
    }
  ]
})
const getImageForCategory = category =>
  mapCategoryImage[category] || CocktailImage

const CategorySection = ({
  categories,
  numberSection,
  setActiveCategory,
  activeCategoryName,
  limits
}) => {
  return (
    <div className='list-section'>
      <ListTitle
        number={numberSection}
        type='category'
        count={categories.length}
      />
      <div className=' container'>
        <MediaQuery query='(max-width: 767px)'>
          <div
            onTouchMove={e => {
              e.preventDefault()
            }}
            className='drinks-list--big'
          >
            {categories.length > 0
              ? <Slider {...getSliderSettings(categories.length)}>
                {categories.sort().map((category, index) => {
                  const limit = limits ? limits[category] : undefined
                  return (
                    <div data-index={index} key={index}>
                      <Category
                        className='category-list__item'
                        name={category}
                        img={getImageForCategory(category)}
                        limit={limit}
                        setActiveCategory={setActiveCategory}
                        active={activeCategoryName === category}
                        />
                    </div>
                  )
                })}
              </Slider>
              : null}
          </div>
        </MediaQuery>
        <MediaQuery query='(min-width: 767px)'>
          <div className='category-list'>
            {categories.sort().map((category, index) => {
              const limit = limits ? limits[category] : undefined
              return (
                <div data-index={index} key={index}>
                  <Category
                    className='category-list__item'
                    name={category}
                    img={getImageForCategory(category)}
                    limit={limit}
                    setActiveCategory={setActiveCategory}
                    active={activeCategoryName === category}
                  />
                </div>
              )
            })}
          </div>
        </MediaQuery>
      </div>
    </div>
  )
}

export default CategorySection
