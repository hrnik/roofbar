import React from 'react'
import Slider from 'react-slick'

import CustomerOrdersContainer from '../../containers/CustomerOrdersContainer'
import CustomerDrinksContainer from '../../containers/CustomerDrinksContainer'
import CategorySection from 'components/CategorySection'
import ListTitle from 'components/ListTitle'

import Link from 'components/Link'

import './CustomerHomeView.scss'

export const CustomerHomeView = ({
  categories,
  limits,
  activeCategoryName,
  setActiveCategory,
  drinks,
  isFetchingDrinks
}) => (
  <div>
    {' '}{isFetchingDrinks
      ? <div>Loading</div>
      : <div className='customer-bar'>
        <div className='customer-bar__main'>
          <div className='container container--left'>
            <h2>Order</h2>
          </div>
          <CategorySection
            categories={categories}
            numberSection={1}
            setActiveCategory={setActiveCategory}
            activeCategoryName={activeCategoryName}
            />
          <div className='list-section list-section--drinks'>
            <ListTitle
              number={2}
              type='type'
              count={drinks.filter(drink => drink.category === activeCategoryName).length}
              />
            <Link className='link-all-coctails' to='/drinks'>Show all</Link>
            <CustomerDrinksContainer />
          </div>
        </div>
        <div className='container orders customer-bar__orders'>
          <div className='orders__header'>
            <h2 className='orders__title'>Your orders</h2>
          </div>
          <CustomerOrdersContainer />
        </div>
      </div>}
  </div>
)

export default CustomerHomeView
