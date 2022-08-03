/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../../actions/messageAction';
import './delete_popup.scss';
import { io } from 'socket.io-client';
import { useRef, useEffect } from 'react';

const DeletePopup = ({ close, mess }) => {
  const socket = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.authData);

  const listConversation = useSelector(
    (state) => state.conversationReducer.conversationData
  );

  const currentMessages = useSelector(
    (state) => state.messageReducer.messagesData
  );

  const currentBoxChat = useSelector(
    (state) => state.conversationReducer.currentChatData
  );

  useEffect(() => {
    socket.current = io('http://localhost:8900');
  }, []);

  const handleDeleteMessage = (mess) => {
    dispatch(
      deleteMessage(listConversation, currentBoxChat, currentMessages, mess)
    );

    if (!currentBoxChat.isGroup) {
      //send action to one user
      const receiver = currentBoxChat.members.find(
        (member) => member.id !== user._id
      );

      socket.current.emit('deleteMessage', {
        ...mess,
        isGroup: currentBoxChat.isGroup,
        receiverId: receiver.id,
        //conversationId: currentBoxChat.id,
      });
    } else {
      //send action to users
      const receivers = currentBoxChat.members.filter(
        (member) => member.id !== user._id
      );

      socket.current.emit('deleteMessage', {
        ...mess,
        isGroup: currentBoxChat.isGroup,
        receiverId: receivers,
        //conversationId: currentBoxChat.id,
      });
    }
  };

  return (
    <>
      <div className='delete__popup p-4 d-flex flex-column'>
        <div>
          <p>Do you want to unsend this message?</p>
        </div>
        <div>
          <p>This action can not be undone.</p>
        </div>
        <div className='delete__popup--buttons d-flex justify-content-end'>
          <div className='popupBtn py-2 px-3' onClick={close}>
            <span>Cancel</span>
          </div>
          <div className='mx-2'></div>
          <div
            className='popupBtn py-2 px-3'
            onClick={() => {
              handleDeleteMessage(mess);
              close();
            }}
          >
            <span>Unsend</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
