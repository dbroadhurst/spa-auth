let intial = {
  users: []
};

const Users = (state = intial, action) => {
  switch (action.type) {
    case 'USERS_LIST':
      return Object.assign({}, state, {users: action.info.users});

    default:
      return state;
  }
};

export default Users;
