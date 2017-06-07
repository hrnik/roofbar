import React from 'react'
import IconBtn from 'components/IconBtn'

export default WrapperComponent => {
  return class extends React.Component {
    makeOrderWithNotify = undefined;
    componentWillMount () {
      this.makeOrderWithNotify = drinkId => {
        return this.props.makeOrder(drinkId).then(
          success => {
            this.props.fetchLimits()
            this.props.notifySuccess({
              // uid: 'once-please', // you can specify your own uid if required
              title: 'Your order created!',
              message: 'The cocktail will be prepared and we will inform you.',
              position: 'tc',
              autoDismiss: 0,
              dismissible: true,
              children: <IconBtn className='notification-msg' ok active />
            })
          },
          () => {
            this.props.notifyWarning({
              // uid: 'once-please', // you can specify your own uid if required
              title: 'Was wrong(',
              message: 'Your order not created.',
              position: 'tc',
              autoDismiss: 0,
              dismissible: true
              // children: ( <IconBtn className='notification-msg' ok active></IconBtn>   )
            })
          }
        )
      }
    }

    render () {
      return (
        <WrapperComponent
          {... this.props}
          makeOrder={this.makeOrderWithNotify}
        />
      )
    }
  }
}
