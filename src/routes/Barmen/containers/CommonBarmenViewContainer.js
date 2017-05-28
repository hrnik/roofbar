import { connect } from 'react-redux'

import CommonBarmenView from '../components/CommonBarmenView'

const mapStateToProps = state => ({
  ...state.location
})

export default connect(mapStateToProps)(CommonBarmenView)
