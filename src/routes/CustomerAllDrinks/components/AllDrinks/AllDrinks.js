import React from 'react'
import Link from 'components/Link'
import SmallDrink from 'components/SmallDrink'
import long from 'routes/BarmenOrder/assets/long.jpg'
import './AllDrinks.scss'

const AllDrinks = ({ drinks, makeOrder }) => {
  return (
    <div className='container'>
      <Link to='/'>Back</Link>
      <h1 className='all-drinks__title'>Coctails</h1>
      {drinks.map((drink, index) => {
        return (
          <div data-index={index} key={index} className='small-drinks-list__item'>
            <SmallDrink
              drinkID={drink.drink_id}
              name={drink.name}
              img={long}
              description={drink.description}
              makeOrder={makeOrder}
              status={drink.status}
            />
          </div>
        )
      })}
    </div>
  )
}

export default AllDrinks
