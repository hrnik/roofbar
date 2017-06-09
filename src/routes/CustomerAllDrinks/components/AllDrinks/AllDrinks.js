import React from 'react'
import Link from 'components/Link'
import SmallDrink from 'components/SmallDrink'
import long from 'routes/BarmenOrder/assets/long.jpg'
import Loader from 'components/Loader'
import './AllDrinks.scss'

const AllDrinks = ({
  drinks,
  makeOrder,
  makingOrders,
  isFetchingDrinks,
  isFetchingOrders,
  disabledCategories,
  activeCategoryName
}) => {
  return (
    <div>
      {!isFetchingDrinks && !isFetchingOrders
        ? <div className='container'>
          <Link to='/'>Back</Link>
          <h1 className='all-drinks__title'>{activeCategoryName}</h1>
          {drinks.filter(drink => drink.category === activeCategoryName)
          .map((drink, index) => {
            return (
              <div
                data-index={index}
                key={index}
                className='small-drinks-list__item'
                >
                <SmallDrink
                  processing={makingOrders[drink.id]}
                  drinkId={drink.id}
                  name={drink.name}
                  disable={disabledCategories[drink.category]}
                  img={drink.photo || long}
                  description={drink.description}
                  makeOrder={makeOrder}
                  status={drink.status}
                  />
              </div>
            )
          })}
        </div>
        : <Loader absoluteCenter />}
    </div>
  )
}

export default AllDrinks
