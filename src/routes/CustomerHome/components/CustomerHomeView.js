import React from 'react'
import Category from 'components/Category'
import ListTitle from 'components/ListTitle'
import BigDrink from 'components/BigDrink'
import OwnOrder from 'components/OwnOrder'

import Button from 'components/Button'
import Link from 'components/Link'

import './CustomerHomeView.scss'
import CocktailImage from '../assets/Cocktail.svg'
import JuiceImage from '../assets/Juice.svg'
import MilkshakeImage from '../assets/Milkshake.svg'
import long from '../assets/long.jpg'

const mapCategoryImage = {
  'Alchocol' : CocktailImage,
  'Milkshake' : MilkshakeImage,
  'Fresh Juice' : JuiceImage
}
const getImageForCategory = (category) => mapCategoryImage[category] || CocktailImage

export const CustomerHomeView = ({ categories, drinks, limits }) => (
  <div>
    <div className='container container--left'>
      <h2>Order</h2>
    </div>
    <div className='list-section'>
      <ListTitle number={1} type='category' count={6} />
      <div className='container container--left category-list'>
        {categories.map(category => {
          return (<Category
            className='category-list__item'
            name={category}
            img={getImageForCategory(category)}
            limit={15}
            active
            drinked={10} />)
        })}
      </div>
    </div>
    <div className='list-section'>
      <ListTitle number={2} type='type' count={8} />
      <Link className='link-all-coctails' to='/counter'>Show all</Link>
      <div className='container conainer--left drinks-list--big drinks-list--big'>
        {drinks.map(drink => {
          return (<BigDrink
            name={drink.name}
            img={long}
            description={drink.description} />
          )
        })}
        <div className='btn-order-wraper'>
          <Button fullWidth>Make order</Button>
        </div>
      </div>

      <div className='container orders'>
        <div className='orders__header'>
          <h2 className='orders__title'>Your orders</h2>
          <Link to='/' clsasName='orders__link'>Show all</Link>
        </div>
        <div className='order-list'>
          <OwnOrder name='Long island iced tea'
            img={long}
            code='010'
            status='prepared'
            active
             />
          <OwnOrder name='Milky way'
            img={long}
            code='005'
            status='done' />
          <OwnOrder name='Apple juice'
            img={long}
            code='015'
            status='3 day ago' />

        </div>
      </div>
    </div>
  </div>
)

export default CustomerHomeView
