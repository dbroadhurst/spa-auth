import {combineReducers} from 'redux';

import auth from './Auth.jsx';
import toolbar from './ToolBar.jsx';
import http from './Http.jsx';
import users from './Users.jsx';

const reducer = combineReducers({auth, toolbar, http, users});

export default reducer;
