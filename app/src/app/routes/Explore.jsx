import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import {toolBarDisplay} from '../actions/toolbar';

import {Users, Protect} from '../components';

class ExploreScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.toolBarDisplay(true);
  }

  render() {
    return (
      <div>
        <Protect/>
        <Users/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toolBarDisplay
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreScreen);
