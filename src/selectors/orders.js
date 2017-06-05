import { ORDER_STATUS_DONE, ORDER_STATUS_PENDING, ORDER_STATUS_CANCELED } from 'store/orders'

export const getCompetedOrders = state => {
  const orders = state.barmenOrders.orders || []
  return orders.filter(order => order.status === ORDER_STATUS_DONE).sort(sortDateDesc)
}

export const getPednignOrders = state => {
  const orders = state.barmenOrders.orders || []
  return orders.filter(order => order.status === ORDER_STATUS_PENDING).sort(sortDateAsc)
}

export const getCanceledOrders = state => {
  const orders = state.barmenOrders.orders || []
  return orders.filter(order => order.status === ORDER_STATUS_CANCELED).sort(sortDateDesc)
}

const sortDateAsc = (a, b) => Date.parse(a.date) - Date.parse(b.date)
const sortDateDesc = (a, b) => Date.parse(b.date) - Date.parse(a.date)
