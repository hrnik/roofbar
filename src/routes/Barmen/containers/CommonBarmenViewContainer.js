import { connect } from 'react-redux'
import { withHandlers, compose } from 'recompose'
import { browserHistory } from 'react-router'

import CommonBarmenView from '../components/CommonBarmenView'

const mapStateToProps = state => ({
  ...state.location,
})

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({
    onSelect : () => option => browserHistory.push(option.value)
  }),
)

export default enhance(CommonBarmenView)
