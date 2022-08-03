import { GET_USER } from '../actions/actionType';

const usersReducer = (state = { users: null }, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

export default usersReducer;
