export const getHost = () => {
  return window.location.protocol + '//' + window.location.hostname + ':3000/';
};

export const http = (dispatch, info) => {
  let token = window.localStorage.getItem('token');

  if (!token && info.protected) {
    return Promise.reject('no token in local storage');
  }

  let body= info.body;
  let method = info.method;

  if (body) {
    //already stringified
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }
  } else {
    body = null;
  }

  dispatch({
    type: 'HTTP_LOADING',
    loading: true
  });

  return fetch(info.url, {
    method: method,
    body: body,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .then((res) => {
      dispatch({
        type: 'HTTP_LOADING',
        loading: false
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: 'HTTP_LOADING',
        loading: false
      });

      return Promise.reject(err);
    });
};
