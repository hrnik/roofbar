import { ORDER_STATUS_DONE, ORDER_STATUS_PENDING, ORDER_STATUS_CANCELED } from 'store/orders'

export const getCompetedOrders = state => {
  const orders = state.barmenOrders.orders || []
  return orders.filter(order => (order.status === ORDER_STATUS_DONE))
}

export const getPednignOrders = state => {
  const orders = state.barmenOrders.orders || []
  return orders.filter(order => (order.status === ORDER_STATUS_PENDING))
}

export const getCanceledOrders = state => {
  const orders = state.barmenOrders.orders || []
  return orders.filter(order => (order.status === ORDER_STATUS_CANCELED))
}
