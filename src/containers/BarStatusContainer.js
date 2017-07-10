import { connect } from 'react-redux'
import BarStatusModal from 'components/BarStatusModal'


const mapStateToProps = state => ({
  ...state.bar
})

export default connect(mapStateToProps)(BarStatusModal)
