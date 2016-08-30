import {http, getHost} from './http.jsx';

export const users = () => {
  return (dispatch) => {
    return http(dispatch, {url: getHost() + 'users', method: 'GET', protected: true})
      .then((res) => {
        dispatch({
          type: 'USERS_LIST',
          info: res
        });
        return res;
      })
      .catch((err) => {
        dispatch({
          type: 'USERS_LIST_ERROR',
          info: err
        });
        return err;
      });
  }
};
