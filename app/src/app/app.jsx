import React from 'react';
import ReactDOM from 'react-dom';

//wrap components in redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

//routing
import {Router, Route, hashHistory} from 'react-router';

//reducers
import reducer from './reducers';

//redux middleware
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import createLogger from 'redux-logger';
const logger = createLogger();

var store = createStore(
  reducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(
    promiseMiddleware,
    thunkMiddleware,
    logger
  )
);

//components
import {Landing, Explore} from './routes';
import {Header, Login, Register, SendPassword, Protect} from './components'

//theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from './Theme.jsx';

import './app.css';

const App = () => {
  return (
    <MuiThemeProvider muiTheme={Theme}>
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route component={Header}>
            <Route path='/' component={Explore}/>
            <Route path='landing' component={Landing}>
              <Route path='register' component={Register}/>
              <Route path='login' component={Login}/>
              <Route path='sendpassword' component={SendPassword}/>
            </Route>
            <Route path='explore' component={Explore}/>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

ReactDOM.render(
  <App/>
  , document.querySelector('.container'));
