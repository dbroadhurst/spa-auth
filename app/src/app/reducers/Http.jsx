let intial = {
  loading: false
};

const http = (state = intial, action) => {
  switch (action.type) {
    case 'HTTP_LOADING':
      return Object.assign({}, state, {loading: action.loading});

    default:
      return state;
  }
};

export default http;
