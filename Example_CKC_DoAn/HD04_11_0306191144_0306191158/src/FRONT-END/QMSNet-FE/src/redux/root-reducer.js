/* eslint-disable import/no-anonymous-default-export */
import { combineReducers } from 'redux';
import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import postReducer from './post/reducer';
import userReducer from './user/reducer';
import conversationReducer from './conversation/reducer';
import socketReducer from './socket/reducer';
import notifyReducer from './notify/reducer';
import onlineReducer from './online/reducer';
import { LOGOUT_SUCCESS } from './auth/action';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    post: postReducer,
    user: userReducer,
    conversation: conversationReducer,
    socket: socketReducer,
    notify: notifyReducer,
    online: onlineReducer,
});

export default (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        return rootReducer(undefined, action)
    }

    return rootReducer(state, action)
}
