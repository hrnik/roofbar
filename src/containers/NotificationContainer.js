import React from 'react'
import { connect } from 'react-redux'

import Notifications from 'react-notification-system-redux'

const style = {
  NotificationItem: {
    // Override the notification item
    DefaultStyle: {
      // Applied to every notification, regardless of the notification level
      fontFamily: 'inherit',
      margin: '10px 5px 2px 1px',
      padding: '16px 74px 16px 16px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '1px 4px 10px 0 rgba(0, 0, 0, 0.06)',
      border: 'solid 2px #9dd745',
      color:'#c5c5c5',
      fontSize: '14px',
      lineHeight: '1.43'
    },

    success: {
      // Applied only to the success notification item
      // color: 'red'
    },
    warning: {
      border:'solid 2px #d76345'
    }
  },
  Title: {
    DefaultStyle: {
      color: '#9dd745',
      fontFamily: 'inherit',
      fontSize: '16px',
      fintWeight: 'bold',
      margin: '0 0 4px 0'
    },
    warning: {
      color:'#d76345'
    }
  },
  Dismiss:{
    DefaultStyle:{
      display:'none'
    }
  }

}

const NotificationContainer = ({ notifications }) => <Notifications notifications={notifications} style={style} />

export default connect(state => ({ notifications: state.notifications }))(NotificationContainer)
