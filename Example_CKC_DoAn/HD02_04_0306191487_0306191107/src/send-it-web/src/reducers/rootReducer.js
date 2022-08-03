import { combineReducers } from 'redux';

import authReducer from './authReducer';
import conversationReducer from './conversationReducer';
import messageReducer from './messageReducer';
import usersReducer from './usersReducer';

export const rootReducers = combineReducers({
  authReducer,
  conversationReducer,
  messageReducer,
  usersReducer,
});
