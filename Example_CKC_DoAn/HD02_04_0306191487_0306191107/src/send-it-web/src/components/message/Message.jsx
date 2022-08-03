/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './message.scss';
import Popup from 'reactjs-popup';

import PropTypes from 'prop-types';
import {
  DeleteForeverOutlined,
  InsertDriveFile,
  // KeyboardReturn,
  MoreVert,
} from '@material-ui/icons';
import MessageFullSize from '../message_full_size/MessageFullSize';
import { getTime, getWeekDaysAndLocaleTime } from '../../utils/common';
import DeletePopup from '../delete_confirm_popup/DeletePopup';
import { emojingMessage } from '../../actions/messageAction';
import { SocketContext } from '../../actions/context';

const Message = ({ mess, own }) => {
  const [showMessageAction, setShowMessageAction] = useState(false);

  const isLink = (text) => {
    if (
      text.includes('http') ||
      text.includes('.com') ||
      text.includes('www')
    ) {
      return (
        <a
          className='message__link'
          href={text}
          target='_blank'
          rel='noreferrer'
        >
          {text}
        </a>
      );
    } else {
      return <p className='mb-0'>{text}</p>;
    }
  };

  const emojiScanner = (key) => {
    switch (key) {
      case 1:
        return '💗';
      case 2:
        return '😆';
      case 3:
        return '😥';
      default:
        return '';
    }
  };

  return (
    <>
      {own ? (
        <div className='message'>
          <div className='message__left d-flex align-items-center'>
            <div className='message__top'>
              <img
                crossOrigin='anonymous'
                src={mess.senderImg}
                alt=''
                className='message__img'
              />
              <div className='message__text d-flex flex-column flex-end align-items-start px-2 pt-2 pb-1'>
                <div className='message__text--content'>
                  {mess.isImage ? (
                    <Popup
                      contentStyle={{ width: '500px' }}
                      modal
                      trigger={<ImageMessage img={mess.message_image} />}
                    >
                      {(close) => (
                        <MessageFullSize
                          close={close}
                          img={mess.message_image}
                        />
                      )}
                    </Popup>
                  ) : mess.isFile ? (
                    <a
                      href={mess.message_image}
                      download
                      target='blank'
                      className='message__file'
                    >
                      <InsertDriveFile />
                      <div className='ellipsis reverse-ellipsis message__file--title'>
                        <span>{mess.message}</span>
                      </div>
                    </a>
                  ) : (
                    isLink(mess.message)
                  )}
                </div>
                <div className='message__text--time mt-1'>
                  {getTime(mess.message_date)}
                </div>
                {mess.quick_emoji.length <= 2 ? (
                  <div className='message__text--emojiLeft d-flex flex-column'>
                    {mess.quick_emoji.map((e) => (
                      <div className='message__text--emote'>
                        {emojiScanner(e.key)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className='message__text--emojiLeft d-flex flex-column'>
                      <div className='message__text--emote'>
                        {emojiScanner(mess.quick_emoji[0].key)}
                      </div>
                      <div className='message__text--emote text-center'>
                        {mess.quick_emoji.length}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className='message__option '>
                <MoreVert
                  onClick={() => setShowMessageAction(!showMessageAction)}
                />
              </div>
              {showMessageAction && <MessageAction mess={mess} left={true} />}
            </div>
          </div>
          <div className='message__right'>
            <div className='message__bottom'>
              {getWeekDaysAndLocaleTime(mess.message_date)}
            </div>
          </div>
        </div>
      ) : (
        <div className='message own'>
          <div className='message__left d-flex align-items-center'>
            <div className='message__top'>
              <div className='message__option '>
                <MoreVert
                  onClick={() => setShowMessageAction(!showMessageAction)}
                />
              </div>
              {showMessageAction && <MessageAction mess={mess} />}
              <div className='message__text d-flex flex-column flex-end align-items-end px-2 pt-2 pb-1'>
                <div className='message__text--content'>
                  {mess.isImage ? (
                    <ImageMessage img={mess.message_image} />
                  ) : mess.isFile ? (
                    <a
                      href={mess.message_image}
                      download
                      target='blank'
                      className='message__file'
                    >
                      <InsertDriveFile />
                      <div className='ellipsis reverse-ellipsis message__file--title'>
                        <span>{mess.message}</span>
                      </div>
                    </a>
                  ) : (
                    isLink(mess.message)
                  )}
                </div>
                <div className='message__text--time mt-1 px-1'>
                  {getTime(mess.message_date)}
                </div>
                {mess.quick_emoji.length <= 2 ? (
                  <div className='message__text--emoji d-flex flex-column'>
                    {mess.quick_emoji.map((e) => (
                      <div className='message__text--emote'>
                        {emojiScanner(e.key)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className='message__text--emoji d-flex flex-column'>
                      <div className='message__text--emote'>
                        {emojiScanner(mess.quick_emoji[0].key)}
                      </div>
                      <div className='message__text--emote text-center'>
                        {mess.quick_emoji.length}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='message__right'>
            <div className='message__bottom'>
              {getWeekDaysAndLocaleTime(mess.message_date)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ImageMessage = ({ img }) => {
  return (
    <div className='message__image'>
      <Popup
        className='popup'
        overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
        contentStyle={{
          width: 'auto',
          maxHeight: '640px',
          borderRadius: '5px',
          backgroundColor: 'transparent',
          border: 'none',
        }}
        modal
        trigger={
          <img
            width='auto'
            height='auto'
            className='message__image--content'
            src={img}
            alt={img}
          />
        }
      >
        {(close) => <MessageFullSize close={close} img={img} />}
      </Popup>
    </div>
  );
};

const MessageAction = ({ mess, left }) => {
  const dispatch = useDispatch();

  const { emojingMessageSocket } = useContext(SocketContext);

  const user = useSelector((state) => state.authReducer.authData);

  const currentMessages = useSelector(
    (state) => state.messageReducer.messagesData
  );

  const currentBoxChat = useSelector(
    (state) => state.conversationReducer.currentChatData
  );

  const handleEmojing = (currentMessages, emote) => {
    dispatch(emojingMessage(currentMessages, emote));

    if (!currentBoxChat.isGroup) {
      //send action to one user
      const receiver = currentBoxChat.members.find(
        (member) => member.id !== user._id
      );
      emojingMessageSocket(receiver.id, emote, currentBoxChat.isGroup);
    } else {
      //send action to users
      const receivers = currentBoxChat.members.filter(
        (member) => member.id !== user._id
      );
      emojingMessageSocket(receivers, emote, currentBoxChat.isGroup);
    }
  };

  return (
    <>
      <div
        className={`message__option--actionList d-flex flex-column ${
          left && 'actionLeft'
        }`}
      >
        {/* <div
          className='message__option--action d-flex justify-content-evenly align-items-center'
          onClick={() => console.log('Reply')}
        >
          <KeyboardReturn className='pr-2' />
          <span>Reply</span>
        </div> */}
        <Popup
          overlayStyle={{ background: 'rgba(0,0,0,0.6)' }}
          contentStyle={{
            width: 'auto',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            border: 'none',
          }}
          modal
          trigger={
            mess.user_id === user._id && (
              <div className='message__option--action d-flex justify-content-evenly align-items-center'>
                <DeleteForeverOutlined className='pr-2' />
                <span>Unsend</span>
              </div>
            )
          }
        >
          {(close) => <DeletePopup close={close} mess={mess} />}
        </Popup>

        <div className='message__option--emojiList d-flex justify-content-evenly align-items-center'>
          <div
            className='message__option--emoji p-1'
            onClick={() =>
              handleEmojing(currentMessages, {
                key: 1,
                author: user._id,
                messId: mess._id,
              })
            }
          >
            💗
          </div>
          <div
            className='message__option--emoji p-1'
            onClick={() =>
              handleEmojing(currentMessages, {
                key: 2,
                author: user._id,
                messId: mess._id,
              })
            }
          >
            😆
          </div>
          <div
            className='message__option--emoji p-1'
            onClick={() =>
              handleEmojing(currentMessages, {
                key: 3,
                author: user._id,
                messId: mess._id,
              })
            }
          >
            😥
          </div>
        </div>
      </div>
    </>
  );
};

Message.propTypes = {
  message: PropTypes.any,
  own: PropTypes.any,
};

export default Message;
