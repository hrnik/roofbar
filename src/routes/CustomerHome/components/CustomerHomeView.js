import React from 'react'
import Category from 'components/Category'
import ListTitle from 'components/ListTitle'
import './CustomerHomeView.scss'

export const CustomerHomeView = () => (
  <div>
    <div className='container container--left'>
      <h2>Order</h2>
    </div>
    <div className='list-section'>
      <ListTitle number='1' type='category' count={6}></ListTitle>
      <div className='container container--left category-list'>
        <Category
          className='category-list__item'
          name='Fresh'
          img='https://maxcdn.icons8.com/iOS7/PNG/32/Drinks/orange_juice-32.png'
          limit={15}
          drinked={10} />
        <Category
          className='category-list__item'
          name='Alchocol'
          img='https://maxcdn.icons8.com/iOS7/PNG/32/Food/cocktail-32.png'
          limit={10}
          drinked={6} />
        <Category
          className='category-list__item'
          name='Milkshake'
          img='https://maxcdn.icons8.com/iOS7/PNG/32/Food/milkshake-32.png'
          limit={11}
          drinked={2} />
      </div>
    </div>
    <div className='list-section'>
      <ListTitle number='2' type='type' count={8}></ListTitle>
    </div>
  </div>
)

export default CustomerHomeView
