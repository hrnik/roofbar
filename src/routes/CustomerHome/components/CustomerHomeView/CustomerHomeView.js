import React from 'react'
import Slider from 'react-slick'

import CustomerOrdersContainer from '../../containers/CustomerOrdersContainer'
import CustomerDrinksContainer from '../../containers/CustomerDrinksContainer'
import Category from 'components/Category'
import ListTitle from 'components/ListTitle'

import Link from 'components/Link'

import './CustomerHomeView.scss'
import CocktailImage from '../../assets/Cocktail.svg'
import JuiceImage from '../../assets/Juice.svg'
import MilkshakeImage from '../../assets/Milkshake.svg'


const mapCategoryImage = {
  'Alchocol' : CocktailImage,
  'Milkshake' : MilkshakeImage,
  'Fresh Juice' : JuiceImage
}
const getImageForCategory = (category) => mapCategoryImage[category] || CocktailImage

const sliderCategoriesSettings = {
  infinite: false,
  centerPadding: '20px',
  slidesToShow: 4,
  swipeToSlide: true
}

export const CustomerHomeView = ({ categories, limits, activeCategoryName, setActiveCategory }) => (
  <div>
    <div className='container container--left'>
      <h2>Order</h2>
    </div>
    <div className='list-section'>
      <ListTitle number={1} type='category' count={6} />
      <div className='category-list'>
        {categories.length > 0 ? <Slider {...sliderCategoriesSettings}>{categories.map((category, index) => {
          return (<div
            data-index={index}
            key={index}>
            <Category
              className='category-list__item'
              name={category}
              img={getImageForCategory(category)}
              limit={15}
              onClick={() => setActiveCategory(category)}
              active={activeCategoryName === category}
              drinked={10} /></div>)
        })}</Slider> : null }
      </div>
    </div>
    <div className='list-section'>
      <ListTitle number={2} type='type' count={8} />
      <Link className='link-all-coctails' to='/counter'>Show all</Link>
      <CustomerDrinksContainer></CustomerDrinksContainer>

      <div className='container orders'>
        <div className='orders__header'>
          <h2 className='orders__title'>Your orders</h2>
          <Link to='/' clsasName='orders__link'>Show all</Link>
        </div>
        <CustomerOrdersContainer></CustomerOrdersContainer>
      </div>
    </div>
  </div>
)

export default CustomerHomeView
