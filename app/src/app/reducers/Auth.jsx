let intial = {
  auth: false,
  token: null,
  info: {
    email: null,
    username: null
  }
};

const Auth = (state = intial, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return Object.assign({}, state, {auth: true});

    case 'AUTH_FAIL':
      return Object.assign({}, state, {auth: false});

    case 'AUTH_INFO':
      if (action.info) {
        return Object.assign({}, state, {info: action.info});
      } else {
        return state;
      }

    case 'AUTH_REGISTER_USER':
      return state;

    case 'AUTH_LOGIN_USER':
      return Object.assign({}, state, {token: action.info.token, message: action.info.message});

    case 'AUTH_REGISTER_ERROR':
    case 'AUTH_LOGIN_ERROR':
      return Object.assign({}, state, {auth: false});

    default:
      return state;
  }
};

export default Auth;
