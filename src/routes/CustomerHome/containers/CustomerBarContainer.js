import { connect } from 'react-redux'

import CustomerHomeView from '../components/CustomerHomeView'

const mapDispathToProps = {

}

const mapStateToProps = state => ({
  ...state.customerBar
})

export default connect(mapStateToProps, mapDispathToProps)(CustomerHomeView)
