import React from 'react'

import CategorySection from 'components/CategorySection'
import ListTitle from 'components/ListTitle'
import BigDrink from 'components/BigDrink'

import long from '../../assets/long.jpg'
import './ManageView.scss'

export const ManageView = ({
  categories,
  limits,
  activeCategoryName,
  setActiveCategory,
  disableDrink,
  enableDrink,
  drinks,
}) => (
  <div>
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
        <div className='drinks-list-manage'>
          {drinks.filter(drink => drink.category === activeCategoryName).map((drink, index) => {
            return (
              <div data-index={index} key={index} className='drinks-list__item'>
                <BigDrink
                  drinkId={drink.id}
                  name={drink.name}
                  img={drink.photo || long}
                  processing={drink.isProcessing}
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
)

export default ManageView
