import React from 'react';
import {hashHistory} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//actions
import {toolBarDisplay} from '../actions/toolbar';

import './landing.css';

class Landing extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.toolBarDisplay(false);
  }

  login() {
    hashHistory.push('landing/login');
  }

  render() {

    return (
      <div className="landing">
        <div className="header">
        </div>

        <div className="contents">

          <div className="left">
            {this.props.children}
          </div>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toolBarDisplay
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Landing);
