import {
  GET_ARRIVAL_MESSAGES,
  GET_MESSAGES,
  MESSAGES_LOADING,
  DELETE_MESSAGE,
  EMOJING,
} from '../actions/actionType';

const messageReducer = (
  state = { messagesData: [], loading: false },
  action
) => {
  switch (action.type) {
    case MESSAGES_LOADING: {
      return {
        loading: true,
        messagesData: [],
      };
    }

    case GET_MESSAGES:
      return {
        ...state,
        loading: false,
        messagesData: action.data,
      };

    case GET_ARRIVAL_MESSAGES:
      return {
        ...state,
        loading: false,
        messagesData: action.data,
      };

    case DELETE_MESSAGE:
      return {
        ...state,
        loading: false,
        messagesData: action.data,
      };

    case EMOJING: {
      return {
        loading: false,
        messagesData: action.data,
      };
    }

    default:
      return state;
  }
};

export default messageReducer;
