import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {me} from '../Actions/auth.jsx';

import {Link} from 'react-router';

class Me extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.me();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {info: state.auth.info};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    me
  }, dispatch);
};

//redux mapping
export default connect(mapStateToProps, mapDispatchToProps)(Me);
