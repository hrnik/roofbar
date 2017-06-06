import { connect } from 'react-redux'
import { setActiveCategory } from 'store/bar'

import CustomerHomeView from '../components/CustomerHomeView'

const mapDispathToProps = {
  setActiveCategory
}

const mapStateToProps = state => ({
  ...state.bar,
  ...state.customerOrders
})

export default connect(mapStateToProps, mapDispathToProps)(CustomerHomeView)
