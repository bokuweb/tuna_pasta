import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pasta from '../components/pasta';
import * as feedActions from '../actions/feed-action';
import * as menuActions from '../actions/menu';

function mapStateToProps(state)  {
  return state;
  //};
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, feedActions, menuActions);
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pasta);
