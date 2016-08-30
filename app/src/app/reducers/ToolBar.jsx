let intial = {
  display: false
};

const ToolBar = (state = intial, action) => {
  switch (action.type) {
    case 'TOOLBAR_DISPLAY':
      return Object.assign({}, state, {display: action.display});

    default:
      return state;
  }
};

export default ToolBar;
