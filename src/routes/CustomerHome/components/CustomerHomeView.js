import React from 'react'
import Category from 'components/Category'
import ListTitle from 'components/ListTitle'
import './CustomerHomeView.scss'

import CocktailImage from '../assets/Cocktail.svg'
import JuiceImage from '../assets/Juice.svg'
import MilkshakeImage from '../assets/Milkshake.svg'

export const CustomerHomeView = () => (
  <div>
    <div className='container container--left'>
      <h2>Order</h2>
    </div>
    <div className='list-section'>
      <ListTitle number='1' type='category' count={6} />
      <div className='container container--left category-list'>
        <Category
          className='category-list__item'
          name='Fresh Juice'
          img={JuiceImage}
          limit={15}
          active={true}
          drinked={10} />
        <Category
          className='category-list__item'
          name='Alchocol'
          img={CocktailImage}
          limit={10}
          drinked={6} />
        <Category
          className='category-list__item'
          name='Milkshake'
          img={MilkshakeImage}
          limit={11}
          drinked={2} />
      </div>
    </div>
    <div className='list-section'>
      <ListTitle number='2' type='type' count={8} />
    </div>
  </div>
)

export default CustomerHomeView
