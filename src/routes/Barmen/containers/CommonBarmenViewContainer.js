import { connect } from 'react-redux'
import { withHandlers, compose } from 'recompose'
import { browserHistory } from 'react-router'
import { openBar, closeBar } from 'store/bar'

import CommonBarmenView from '../components/CommonBarmenView'

const mapDispatchToProps = {
  openBar,
  closeBar
}

const mapStateToProps = state => ({
  ...state.location,
  ...state.bar,
  ...state.ordersStore
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSelect : () => option => browserHistory.push(option.value)
  }),
)

export default enhance(CommonBarmenView)
