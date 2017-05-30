import { connect } from 'react-redux'
import { makeOrder } from 'store/orders'

import AllDrinks from '../components/AllDrinks'

const mapDispathToProps = {
  makeOrder
}

const mapStateToProps = state => ({
  ...state.bar
})

export default connect(mapStateToProps, mapDispathToProps)(AllDrinks)
