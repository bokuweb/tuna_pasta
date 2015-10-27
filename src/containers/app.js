import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pasta from '../components/pasta';
import * as commentActions from '../actions/comment';

function mapStateToProps(state)  {
  return {
    comments : state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pasta);
