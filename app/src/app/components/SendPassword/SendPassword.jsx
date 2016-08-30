import React from 'react';
import {hashHistory} from 'react-router'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';

//actions
import {authSendPassword} from '../../actions/auth';

//components
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

//material
import Paper from 'material-ui/Paper';

import {LoadImage} from '../../components';

import './sendpassword.css';

class Recover extends React.Component {

  constructor(props) {
    super(props);
    //bind since these functions are called from event handlers
    this.login = this.login.bind(this);
    this.sendPassword = this.sendPassword.bind(this);
    this.register = this.register.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      canSubmit: false,
      error: ''
    };
  }

  sendPassword() {
    this.props.authSendPassword(this.values)
      .then((res) => {
        this.setState({error: ''});
        hashHistory.push('login');
      })
      .catch((err) => {
        this.setState({error: 'Email not found'});
      });
  }

  login() {
    hashHistory.push('landing/login');
  }

  register() {
    hashHistory.push('landing/register');
  }

  onChange(values) {
    this.values = values;
    if (values && values.email) {
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
      <div className="sendpassword">
        <Paper className="contents" zDepth={3}>
          <LoadImage className="logo" image="assets/logo.png" style={imageStyle}/>
          <h2 className="text-banner">Reset Password</h2>

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

          </Formsy.Form>

          <div className="error">{this.state.error}</div>

          <RaisedButton onClick={this.sendPassword} className="button" disabled={!this.state.canSubmit}
                        label="PASSWORD RESET"/>

          <FlatButton onClick={this.register} className="button" label="REGISTER"/>

          <FlatButton onClick={this.login} className="button" label="LOGIN"/>

        </Paper>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({authSendPassword}, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Recover);
