import {
  REGISTER,
  LOGIN,
  LOGOUT,
  UPDATE,
  GET_LOGIN,
} from '../actions/actionType';

const authReducer = (state = { authData: null, check: false }, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        authData: action.data,
        loading: false,
        errors: null,
      };

    case LOGIN:
      //console.log(action.data);
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return {
        ...state,
        authData: action.data,
        check: true,
        loading: false,
        errors: null,
      };
    case GET_LOGIN:
      if (action.payload !== null) {
        return { ...state, authData: action.payload, check: true };
      } else {
        return { ...state, authData: action.payload, check: false };
      }
    case UPDATE:
      localStorage.clear();
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        check: true,
        loading: false,
        errors: null,
      };

    case LOGOUT:
      localStorage.clear();

      return {
        ...state,
        authData: null,
        check: false,
        loading: false,
        errors: null,
      };

    default:
      return state;
  }
};

export default authReducer;
