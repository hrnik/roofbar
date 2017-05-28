import { connect } from 'react-redux'
import { enableDrink, disableDrink, setActiveCategory } from 'store/bar'

import ManageView from '../components/ManageView'

const mapDispathToProps = {
  disableDrink,
  enableDrink,
  setActiveCategory
}

const mapStateToProps = state => ({
  ...state.bar
})

export default connect(mapStateToProps, mapDispathToProps)(ManageView)
