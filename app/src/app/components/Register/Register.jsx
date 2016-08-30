import React from 'react';
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';

//actions
import {authRegister} from '../../actions/auth';

//components
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

//material
import Paper from 'material-ui/Paper';

import {LoadImage} from '../../components';

import './register.css';

class Register extends React.Component {

  constructor(props) {
    super(props);
    //bind since these functions are called from event handlers
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      canSubmit: false,
      error: ''
    };
  }

  signup() {
    this.setState({error: ''});

    this.props.authRegister(this.values)
      .then((res) => {
        hashHistory.push('landing/login');
      })
      .catch((err) => {
        this.setState({error: 'email already registered'});
      });
  }

  login() {
    hashHistory.push('landing/login');
  }

  onChange(values) {
    this.values = values;
    if (values && values.email && values.password && values.passwordConfirm) {
      this.enableButton()
    } else {
      this.disableButton()
    }
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  };

  disableButton() {
    this.setState({
      canSubmit: false
    });
  };

  render() {

    let imageStyle = {
      'backgroundPosition': 'center',
      'backgroundRepeat': 'no-repeat',
      'backgroundSize': 'contain',
      'transformStyle': 'preserve-3d'
    };

    return (
      <div className="register">

        <Paper className="contents" zDepth={3}>
          <LoadImage className="logo" image="assets/logo.png" style={imageStyle}/>
          <h2 className="text-banner">Register</h2>

          <Formsy.Form
            onChange={this.onChange}
          >

            <div>
              <FormsyText
                name="email"
                validations="isEmail"
                validationError="Please provide a valid email"
                required
                hintText="email@domain.com"
                floatingLabelText="email"
              />
            </div>

            <div>
              <FormsyText
                name="username"
                required
                floatingLabelText="username"
                hintText="username"
                type="username"
              />
            </div>

            <div>
              <FormsyText
                name="password"
                required
                floatingLabelText="password"
                hintText="password"
                type="password"
              />
            </div>

            <div>
              <FormsyText
                name="passwordConfirm"
                validations="equalsField:password"
                validationError="passwords need to be the same"
                required
                floatingLabelText="confirm password"
                hintText="password confirm"
                type="password"
              />
            </div>

          </Formsy.Form>

          <div className="error">{this.state.error}</div>

          <RaisedButton onClick={this.signup} className="button" disabled={!this.state.canSubmit} label="SIGN UP"/>

          <FlatButton onClick={this.login} className="button" label="LOGIN"/>

          <div style={this.props.loading ? {} : {display: 'none'} }>
            <CircularProgress size={2}/>
          </div>

        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.http.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    authRegister
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
