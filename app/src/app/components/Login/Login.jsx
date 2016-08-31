import React from 'react';
import {hashHistory} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//material
import Paper from 'material-ui/Paper';

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';

//actions
import {authLogin} from '../../actions/auth';

//components
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import {LoadImage} from '../../components';


import './login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    //bind since these functions are called from event handlers
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.recover = this.recover.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      canSubmit: false,
      error: ''
    };
  }

  login() {
    this.props.authLogin(this.values)
      .then((res) => {
        this.setState({error: ''});
        hashHistory.push('explore');
      })
      .catch((err) => {
        this.setState({error: 'Wrong email or password'});
      });
  }

  register() {
    hashHistory.push('landing/register');
  }

  recover() {
    hashHistory.push('landing/sendpassword');
  }

  onChange(values) {
    this.values = values;
    if (values && values.email && values.password) {
      this.enableButton();
    } else {
      this.disableButton();
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
      <div className="login">
        <Paper className="contents" zDepth={3}>
          <LoadImage className="logo" image="assets/logo.png" style={imageStyle}/>
          <h2 className="text-banner">Login</h2>

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
                name="password"
                required
                floatingLabelText="password"
                hintText="password"
                type="password"
              />
            </div>

          </Formsy.Form>

          <div className="error">{this.state.error}</div>

          <RaisedButton onClick={this.login} className="button" disabled={!this.state.canSubmit} label="LOGIN"/>

          <FlatButton onClick={this.register} className="button" label="REGISTER"/>

          <FlatButton onClick={this.recover} className="button" label="Need login help?"/>

          <div style={this.props.loading ? {} : {display: 'none'} }>
            <CircularProgress size={2}/>
          </div>

        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.http.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({authLogin}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
