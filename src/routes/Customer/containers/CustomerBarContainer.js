import { connect } from 'react-redux'
import { setActiveCategory } from 'store/bar'

const mapDispathToProps = {
  setActiveCategory
}

const mapStateToProps = state => ({
  ...state.bar
})

const CustomerContainer = ({ children }) => <div>{children}</div>
export default connect(mapStateToProps, mapDispathToProps)(CustomerContainer)
