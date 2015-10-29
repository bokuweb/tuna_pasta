import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pasta from '../components/pasta';
import * as actions from '../actions/feed-action';

function mapStateToProps(state)  {
  return {
    items : state.feed.items
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pasta);
