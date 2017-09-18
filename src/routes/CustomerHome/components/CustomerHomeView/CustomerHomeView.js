import React from 'react'
import Slider from 'react-slick'

import Loader from 'components/Loader'
import CustomerOrdersContainer from '../../containers/CustomerOrdersContainer'
import CustomerDrinksContainer from '../../containers/CustomerDrinksContainer'
import CategorySection from 'components/CategorySection'
import ListTitle from 'components/ListTitle'
import BarStatusContainer from 'containers/BarStatusContainer'
import { DRINK_STATUS_DISABLE } from 'store/bar'

import Link from 'components/Link'

import './CustomerHomeView.scss'

export const CustomerHomeView = ({
  categories,
  limits,
  activeCategoryName,
  setActiveCategory,
  drinks,
  isFetchingDrinks,
  isFetchingOrders
}) => {
  const newCategories = categories.filter(category => drinks.some(drink =>  drink.category === category && drink.status !== DRINK_STATUS_DISABLE))
  return (<div>
      {!isFetchingDrinks && !isFetchingOrders
      ? <div className='customer-bar'>
        <div className='customer-bar__main'>
          <div className='container container--left'>
            <h2>Order</h2>
          </div>
          <CategorySection
            categories={newCategories}
            numberSection={1}
            setActiveCategory={setActiveCategory}
            activeCategoryName={activeCategoryName}
            limits={limits}
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
      </div>
      : <Loader absoluteCenter />}
      <BarStatusContainer />
    </div>
  )
}

export default CustomerHomeView
