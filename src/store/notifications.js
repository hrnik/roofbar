import Notifications from 'react-notification-system-redux'

export const notifySuccess = options => (dispatch, getState) => {
  return dispatch(Notifications.success(options))
}

export const notifyWarning = options => (dispatch, getState) => {
  return dispatch(Notifications.warning(options))
}
