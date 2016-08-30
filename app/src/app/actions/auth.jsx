import {http, getHost} from './http.jsx';

export const auth = () => {
  return (dispatch) => {
    return http(dispatch, {url: getHost() + 'auth', method: 'GET', protected: true})
      .then((res) => {
        dispatch({
          type: 'AUTH_SUCCESS',
          info: res
        });
        return res;
      })
      .catch((err) => {
        dispatch({
          type: 'AUTH_FAIL',
          info: err
        });

        return Promise.reject(err);
      });
  }
};

export const me = () => {
  return (dispatch) => {
    return http(dispatch, {url: getHost() + 'me', method: 'GET', protected: true})
      .then((res) => {
        dispatch({
          type: 'AUTH_INFO',
          info: res
        });
        return res;
      })
  }
};

export const authRegister = (payload) => {
  return (dispatch) => {
    return http(dispatch, {url: getHost() + 'register', method: 'POST', body: payload, protected: false})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
};

export const authLogin = (payload) => {
  return (dispatch) => {
    return http(dispatch, {url: getHost() + 'login', method: 'POST', body: payload, protected: false})
      .then((res) => {
        window.localStorage.setItem('token', res.token);
        return res;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
};

export const authSendPassword = (payload) => {
  return (dispatch) => {
    return http(dispatch, {url: getHost() + 'password', method: 'POST', body: payload, protected: false})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
};
