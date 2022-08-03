import { GET_CONVERSATION, SET_CURRENT_CHAT } from '../actions/actionType';

const conversationReducer = (
  state = { conversationData: null, currentchatData: null },
  action
) => {
  switch (action.type) {
    case GET_CONVERSATION:
      return {
        ...state,
        conversationData: action.data,
      };

    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChatData: action.data,
      };

    default:
      return state;
  }
};

export default conversationReducer;
