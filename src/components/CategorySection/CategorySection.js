import React from 'react'
import ListTitle from 'components/ListTitle'
import Category from 'components/Category'

import CocktailImage from './assets/Cocktail.svg'
import JuiceImage from './assets/Juice.svg'
import SmoothieImage from './assets/Smoothie.svg'


import './CategorySection.scss'

const mapCategoryImage = {
  Alchocol: CocktailImage,
  Beer: CocktailImage,
  Juice: JuiceImage,
  Smoothie: SmoothieImage,
}
const getImageForCategory = category => mapCategoryImage[category] || CocktailImage

const CategorySection = ({ categories, numberSection, setActiveCategory, activeCategoryName, limits }) => {
  return (
    <div className='list-section'>
      <ListTitle number={numberSection} type='category' count={categories.length} />
      <div className='category-list container'>
        {categories.length > 0
          ? categories.sort().map((category, index) => {
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
          })
          : null}
      </div>
    </div>
  )
}

export default CategorySection
