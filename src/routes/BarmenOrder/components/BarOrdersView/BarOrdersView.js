import React from 'react'

import classNames from 'classnames'

import BarOrdersList from '../BarOrdersList'

import './BarOrdersView.scss'

export class BarOrdersView extends React.Component {

  componentWillReceiveProps (nextProps) {
    const {
      isNeedDingDong,
      notNeedDingDong
    } = nextProps
    if (isNeedDingDong) {
      console.log('DING DONG', notNeedDingDong)
      setTimeout(()=>{
        const audio = document.querySelector('#audiobtn')
        if (audio) {
          audio.click()
        }
      })

      notNeedDingDong()
    }
  }

  playSound (stop) {
    const audio = document.querySelector(`#dingdong`)
    if (!audio) return // stop the function from running all together
    audio.currentTime = 0 // rewind to the start
    audio.play()
    if (stop) {
      audio.pause()
    }
  }

  render () {
    const {
      completedOrders,
      pendingOrders,
      canceledOrders,
      completeOrder,
      cancelOrder,
      toogleEditMode,
      normalMode,
      getDrinkById,

    } = this.props
    return (
      <div className='container orders-workplace'>
        <button  className={'btnSound'} id='audiobtn' onClick={() => { this.playSound() }} />
        <audio id='dingdong'  src='/dingdong.mp3' />
        <div className='orders-workplace__new'>
          <div className='orders-workplace__title-wrapper'>
            <h3 className='orders-workplace__titile'>New</h3>
            {pendingOrders.length > 0 &&
            <h3
              className={classNames('orders-workplace__edit-mode', {
                'orders-workplace__edit-mode--normal': !normalMode,
                'orders-workplace__edit-mode--decline': normalMode
              })}
              onClick={toogleEditMode}
            >
              {!normalMode ? <span>Normal mode</span> : <span>Decline mode</span>}
            </h3>}
          </div>
          <BarOrdersList
            list={pendingOrders}
            normalMode={normalMode}
            completeOrder={(id) => {
              this.playSound(true)
              completeOrder(id)
            }}
            cancelOrder={cancelOrder}
            getDrinkById={getDrinkById}
        />
        </div>
        <div className='orders-workplace__done'>
          <h3 className='orders-workplace__titile'>Done</h3>
          <BarOrdersList
            list={completedOrders}
            normalMode={normalMode}
            completeOrder={completeOrder}
            cancelOrder={cancelOrder}
            getDrinkById={getDrinkById}
        />
        </div>
        <div className='orders-workplace__cancel'>
          <h3 className='orders-workplace__titile'>Declined</h3>
          <BarOrdersList
            list={canceledOrders}
            normalMode={normalMode}
            completeOrder={completeOrder}
            cancelOrder={cancelOrder}
            getDrinkById={getDrinkById}
            component='div'
            className='canceled-order-list'
        />
        </div>

      </div>
    )
  }
}

export default BarOrdersView
