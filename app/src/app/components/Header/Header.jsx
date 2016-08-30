import React from 'react';
import ReactDOM from 'react-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {hashHistory, Link} from 'react-router';

import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import {auth} from '../../actions';

import Trianglify from 'trianglify';

import './header.css'
class Header extends React.Component {

  constructor(props) {
    super(props);

    let patternDefault = {
      cell_size: 25,
      variance: 0.75,
      x_colors: 'random',
      y_colors: 'match_x',
      palette: Trianglify.colorbrewer,
      color_space: 'lab',
      color_function: false,
      stroke_width: 1.51,
      width: 1024,
      height: 320,
      seed: 123
    };
    let pattern = Trianglify(patternDefault).png();

    this.state = {
      value: 'logout',
      pattern: pattern
    };
    this.handleChange = this.handleChange.bind(this);
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userID');
    hashHistory.push('landing/login');
  }

  handleChange(event, index, value) {
    this.setState({value}, () => {
      if (this.state.value === 'logout') {
        this.logout();
      }
    });
  }

  render() {
    return (
      <div>
        <Toolbar style={this.props.toolbar.display ? {} : {display: 'none'}}>

          <ToolbarGroup firstChild={true}>
            <ToolbarGroup>
              <Link to="explore">
                <img height="56px" src="/assets/logo.png"/>
              </Link>
            </ToolbarGroup>
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarGroup>
              <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                <MenuItem value="logout" primaryText="Logout"/>
              </DropDownMenu>
            </ToolbarGroup>
          </ToolbarGroup>

        </Toolbar>

        <div className="header" style={this.props.toolbar.display ? {} : {display: 'none'}}>
          <div className="banner" style={{'backgroundImage': 'url(' + this.state.pattern + ')'}}>
            <div className="title">
              <h1>SPA Auth</h1>
              <h2>Easy SPA Auth</h2>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.auth.info,
    toolbar: {
      display: state.toolbar.display
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    auth
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(Header)
