import React from 'react'
import Link from 'components/Link'
import BigDrink from 'components/BigDrink'
const long = {}

const AllDrinks = ({ drinks, makeOrder }) => {
  return (
    <div>
      <Link>Back</Link>
      <h1>Coctails</h1>
      {drinks.map((drink, index) => {
        return (
          <div data-index={index} key={index} className='drinks-list__item'>
            <BigDrink
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
