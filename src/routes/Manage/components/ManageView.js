import React from 'react'

import CategorySection from 'components/CategorySection'
import ListTitle from 'components/ListTitle'
import BigDrink from 'components/BigDrink'

import long from '../assets/long.jpg'

export const ManageView = ({
  categories,
  limits,
  activeCategoryName,
  setActiveCategory,
  disableDrink,
  enableDrink,
  drinks
}) => (
  <div className='customer-bar'>
    <div className='customer-bar__main'>
      <div className='container container--left'>
        <h2>Manage</h2>
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
          count={drinks && drinks.filter(drink => drink.category === activeCategoryName).length}
        />
        <div>
          <div className='drinks-list'>
            {drinks.filter(drink => drink.category === activeCategoryName).map((drink, index) => {
              return (
                <div data-index={index} key={index} className='drinks-list__item'>
                  <BigDrink
                    drinkID={drink.drink_id}
                    name={drink.name}
                    img={long}
                    description={drink.description}
                    disableDrink={disableDrink}
                    enableDrink={enableDrink}
                    status={drink.status}
                    disableMode
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ManageView
