import React from 'react'
import ListTitle from 'components/ListTitle'
import Category from 'components/Category'

import CocktailImage from './assets/Cocktail.svg'
import JuiceImage from './assets/Juice.svg'
import MilkshakeImage from './assets/Milkshake.svg'


import './CategorySection.scss'

const mapCategoryImage = {
  Alchocol: CocktailImage,
  Milkshake: MilkshakeImage,
  'Fresh Juice': JuiceImage,
}
const getImageForCategory = category => mapCategoryImage[category] || CocktailImage

const CategorySection = ({ categories, numberSection, setActiveCategory, activeCategoryName }) => {
  return (
    <div className='list-section'>
      <ListTitle number={numberSection} type='category' count={categories.length} />
      <div className='category-list container'>
        {categories.length > 0
          ? categories.map((category, index) => {
            return (
              <div data-index={index} key={index}>
                <Category
                  className='category-list__item'
                  name={category}
                  img={getImageForCategory(category)}
                  limit={15}
                  setActiveCategory={setActiveCategory}
                  active={activeCategoryName === category}
                  drinked={10}
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
