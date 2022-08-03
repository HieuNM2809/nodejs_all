import React from 'react';
import PropTypes from 'prop-types';
import './conversation.scss';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CURRENT_CHAT, GET_CONVERSATION } from '../../actions/actionType';
import { getConversationTimeShow } from '../../utils/common';
import * as api from '../../API/indexAPI';

const Conversation = ({ conversation }) => {
  const dispatch = useDispatch();

  const listConversation = useSelector(
    (state) => state.conversationReducer.conversationData
  );
  const currentBoxChat = useSelector(
    (state) => state.conversationReducer.currentChatData
  );
  const user = useSelector((state) => state.authReducer.authData);

  const handleSetCurrentChat = async (conversation) => {
    if (currentBoxChat?.id === conversation.id) {
      dispatch({ type: SET_CURRENT_CHAT, data: null });
    } else {
      dispatch({ type: SET_CURRENT_CHAT, data: conversation });
      if (conversation.id) {
        const isReadUpdating = {
          conv_id: conversation.id,
          user_id: user._id,
          isRead: true,
        };
        await api.updateIsReadStatusApi(isReadUpdating);
        dispatch({
          type: GET_CONVERSATION,
          data: [...listConversation]?.map((conv) =>
            conv.id === conversation.id
              ? {
                  ...conv,
                  isRead: true,
                }
              : conv
          ),
        });
      }
    }
  };

  return (
    <div>
      {listConversation?.map((conv, index) => (
        <div
          key={index}
          onClick={() => {
            handleSetCurrentChat(conv);
          }}
          className={`conversation ${
            currentBoxChat?.id === conv.id ? 'activeConversation' : ''
          }`}
        >
          <img
            crossOrigin='anonymous'
            src={conv.partnerAvt}
            alt=''
            className='conversation__img'
          />
          <div className='conversation__group'>
            <span className='conversation__name'>{conv.partnerName}</span>
            <div className='conversation__message'>
              <span className='conversation__message--name'>
                {conv.lastSenderId === user._id ? 'You: ' : ''}
              </span>
              <span className='conversation__message'>{conv.lastMessage}</span>
            </div>
          </div>
          <div className='conversation__unreadMark d-flex flex-column'>
            {!conv.isRead && (
              <div className='conversation__unreadMark--mark'></div>
            )}
            <div className='conversation__time pt-4 px-2'>
              <span>{getConversationTimeShow(conv.lastSendAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.any,
};

export default Conversation;
