import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {auth} from '../../actions/auth.jsx';

class Protect extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.auth()
      .catch((err)=> {
        hashHistory.push('landing/login');
      });
  }

  render() {
    return (
      <div>
        <div>{this.props.auth ? this.props.children : null}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    auth
  }, dispatch);
};

//redux mapping
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Protect);
