import React, { useContext } from 'react';
import './messenger.scss';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TextArea from 'textarea-autosize-reactjs';
import {
  MoreHoriz,
  Send,
  VideoCallOutlined,
  Mood,
  InsertDriveFile,
  AttachFile,
  CallTwoTone,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import NoChat from '../../components/nochat/NoChat';
import SearchForm from '../../components/searchform/SearchForm';
import * as api from '../../API/indexAPI';
import { isArray } from 'lodash';
import {
  GET_CONVERSATION,
  GET_MESSAGES,
  SET_CURRENT_CHAT,
} from '../../actions/actionType';
import EmojiPicker from '../../components/emoji/EmojiPicker';
import MessageFullSize from '../../components/message_full_size/MessageFullSize';
import Popup from 'reactjs-popup';
import {
  deleteMessage,
  emojingMessage,
  getArrivalMessages,
  getMessages,
} from '../../actions/messageAction';
import { SocketContext } from '../../actions/context';
import CallNotification from '../../components/callNotification/CallNotification';
import CallVideo from '../../components/callVideo/CallVideo';

const Messenger = () => {
  const [newMessage, setNewMessage] = useState('');
  const [filterResult, setFilterResult] = useState(null);
  const [checkMore, setCheckMore] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [open, setOpen] = useState(false);

  const inputRef = useRef(null);

  const scrollRef = useRef();
  const dispatch = useDispatch();

  //get user logined
  const user = useSelector((state) => state.authReducer.authData);
  const listConversation = useSelector(
    (state) => state.conversationReducer.conversationData
  );
  const currentBoxChat = useSelector(
    (state) => state.conversationReducer.currentChatData
  );
  const currentMessages = useSelector(
    (state) => state.messageReducer.messagesData
  );
  const currentMessagesLoading = useSelector(
    (state) => state.messageReducer.loading
  );

  // const soundMes = new Audio('./soundMes.mp3');
  // const soundCall = new Audio('./soundCall.mp3');

  const {
    call,
    time,
    isLeave,
    arrivalMessage,
    getMessage,
    sendMessage,
    sendImage,
    sendNewPrivateChat,
    deletedArrivalMessage,
    arrivalEmoji,
    onCamera,
    leaveCall,
    audioMess,
    arrivalGroupChat,
  } = useContext(SocketContext);

  const handleCheckMore = () => {
    setCheckMore(!checkMore);
  };

  const handleShowEmoji = () => {
    setShowEmoji((show) => !show);
  };

  const handleSelectEmoji = (e) => {
    setNewMessage((newMessage) => (newMessage += e.native));
  };

  const updateIsReadStatus = (isReadObject) => {
    return api.updateIsReadStatusApi(isReadObject);
  };
  const setThisChatToReaded = async (conversation, isRead) => {
    const isReadUpdating = {
      conv_id: conversation.id,
      user_id: user._id,
      isRead,
    };
    await updateIsReadStatus(isReadUpdating);
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
  };
  const updateListConv = (userId) => {
    return api.getConversation(userId);
  };

  //Web Socket
  useEffect(() => {
    getMessage();
  }, [dispatch, user?._id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await updateListConv(user._id);
        dispatch({ type: GET_CONVERSATION, data: res.data });
        dispatch({ type: SET_CURRENT_CHAT, data: null });
      } catch (err) {
        console.log('can not get conversation');
      }
    };
    getConversations();
  }, [user?._id, dispatch]);

  //get messages
  useEffect(() => {
    //get messages when chosing box chat
    dispatch(getMessages(currentBoxChat?.id));
  }, [currentBoxChat?.id]);

  const handleSetCurrentChat = (conversation) => {
    dispatch({ type: SET_CURRENT_CHAT, data: conversation });
  };

  //get new group chat
  useEffect(() => {
    const getNewGrpChat = async () => {
      const res = await updateListConv(user._id);
      dispatch({ type: GET_CONVERSATION, data: res.data });
    };
    getNewGrpChat();
  }, [arrivalGroupChat]);
  console.log(currentBoxChat);
  useEffect(() => {
    const getNewMessage = async () => {
      arrivalMessage &&
        currentBoxChat?.members.filter((m) => m.id === arrivalMessage.user_id)
          .length > 0 &&
        dispatch(getArrivalMessages(currentMessages, arrivalMessage));
      //update redux when message arrive

      //update current chat
      const res = await updateListConv(user._id);
      dispatch({ type: GET_CONVERSATION, data: res.data });

      if (currentBoxChat?.id) {
        dispatch({
          type: SET_CURRENT_CHAT,
          data: {
            ...currentBoxChat,
            lastMessage: arrivalMessage?.isImage
              ? '[Photo]'
              : arrivalMessage?.isFile
              ? '[File]'
              : arrivalMessage?.message,
            lastMessageId: arrivalMessage?._id,
            lastSendAt: arrivalMessage.createdAt,
          },
        });
      }

      //if new mess is an image then get it
      if (arrivalMessage?.isImage) {
        dispatch({
          type: SET_CURRENT_CHAT,
          data: {
            ...currentBoxChat,
            imageList: [
              {
                message_id: arrivalMessage._id,
                image: arrivalMessage.message_image,
                sendAt: Date.now(),
                sender: arrivalMessage.user_id,
              },
              ...currentBoxChat.imageList,
            ],
          },
        });
        return;
      }
      if (arrivalMessage?.isFile) {
        dispatch({
          type: SET_CURRENT_CHAT,
          data: {
            ...currentBoxChat,
            fileList: [
              {
                message_id: arrivalMessage._id,
                file: arrivalMessage.message_image,
                message: arrivalMessage.message,
                sendAt: Date.now(),
                sender: arrivalMessage.user_id,
              },
              ...currentBoxChat.fileList,
            ],
          },
        });
        return;
      }
      if (arrivalMessage) {
        audioMess.play();
      }
    };
    getNewMessage();
  }, [arrivalMessage, user._id, dispatch]);

  // when partner delete message
  useEffect(() => {
    const updateDeleteMessage = async () => {
      dispatch(
        deleteMessage(
          listConversation,
          currentBoxChat,
          currentMessages,
          deletedArrivalMessage
        )
      );
      const res = await updateListConv(user._id);
      dispatch({ type: GET_CONVERSATION, data: res.data });
    };
    updateDeleteMessage();
  }, [deletedArrivalMessage]);

  //when partner emojing message
  useEffect(() => {
    dispatch(emojingMessage(currentMessages, arrivalEmoji));
  }, [arrivalEmoji]);

  //send message
  const handleSend = async (e) => {
    var newMessToSendSocket;
    e.preventDefault();
    if (!!currentBoxChat?.id) {
      if (newMessage.trim().length !== 0) {
        const message = {
          message: newMessage,
          conversation_id: currentBoxChat.id,
          user_id: user._id,
          isImage: false,
        };
        try {
          const res = await api.sendMessage(message);
          // inputRef.current.value = '';
          setNewMessage('');
          newMessToSendSocket = { ...res.data, senderImg: user.image };

          dispatch({
            type: GET_MESSAGES,
            data: [...currentMessages, res.data],
          });
          //update isRead Status of partner
          if (!currentBoxChat.isGroup) {
            await updateIsReadStatus({
              conv_id: currentBoxChat.id,
              user_id: currentBoxChat.partnerId,
              isRead: false,
            });
          } else {
            for (let i = 0; i < currentBoxChat.members.length; i++) {
              if (currentBoxChat.members[i].id !== user._id) {
                await updateIsReadStatus({
                  conv_id: currentBoxChat.id,
                  user_id: currentBoxChat.members[i].id,
                  isRead: false,
                });
              }
            }
          }

          const resOfConvs = await updateListConv(user._id);
          dispatch({ type: GET_CONVERSATION, data: resOfConvs.data });
          dispatch({
            type: SET_CURRENT_CHAT,
            data: {
              ...currentBoxChat,
              lastMessage: res.data.isImage ? '[Photo]' : res.data.message,
              lastMessageId: res.data._id,
              lastSendAt: res.data.createdAt,
            },
          });
        } catch (error) {
          console.log(error);
        }

        if (!currentBoxChat.isGroup) {
          //send action to one user
          const receiver = currentBoxChat.members.find(
            (member) => member.id !== user._id
          );
          sendMessage(receiver.id, newMessToSendSocket, currentBoxChat.isGroup);
        } else {
          //send action to users
          const receivers = currentBoxChat.members.filter(
            (member) => member.id !== user._id
          );
          sendMessage(receivers, newMessToSendSocket, currentBoxChat.isGroup);
        }
      }
    } else {
      //delete searching
      var newConversationId;
      var resetCurrentBoxChat;
      // New Chat
      if (newMessage.trim().length !== 0) {
        const newConversation = [
          {
            id: currentBoxChat.partnerId,
            email: currentBoxChat.partnerEmail,
            fullname: currentBoxChat.partnerName,
          },
          {
            id: user._id,
            email: user.email,
            fullname: user.full_name,
          },
        ];

        try {
          const res = await api.createNewConversation(newConversation);
          newConversationId = res.data._id;
        } catch (error) {
          console.log('error when create a new conversation: ' + error);
        }

        const message = {
          message: newMessage,
          conversation_id: newConversationId,
          user_id: user._id,
        };

        try {
          const res = await api.sendMessage(message);
          // inputRef.current.value = '';
          setNewMessage('');

          dispatch({
            type: GET_MESSAGES,
            data: [...currentMessages, res.data],
          });
        } catch (error) {
          console.log('can not send new mess:' + error);
        }

        try {
          const updateConvs = await updateListConv(user._id);
          dispatch({ type: GET_CONVERSATION, data: updateConvs.data });
          resetCurrentBoxChat = updateConvs.data.find(
            (c) => c.id === newConversationId
          );
          dispatch({ type: SET_CURRENT_CHAT, data: resetCurrentBoxChat });
          setFilterResult(null);
        } catch (e) {
          console.log('can not send new mess:' + e);
        }
        //update for new chat
        try {
          await updateIsReadStatus({
            conv_id: newConversationId,
            user_id: currentBoxChat.partnerId,
            isRead: false,
          });
        } catch (error) {
          console.log('can not update isRead Status' + e);
        }

        const receiver = resetCurrentBoxChat.members.find(
          (member) => member.id !== user._id
        );

        sendNewPrivateChat(newConversationId, receiver.id);
      }
    }
  };

  const handleSendImage = async (e) => {
    var newMessToSendSocket;
    var mess_img;
    var mess_file;
    const imageFile = e.target.files[0];
    const newFileName = Date.now() + imageFile.name;
    const formData = new FormData();

    if (
      imageFile.name.includes('.jpg') ||
      imageFile.name.includes('.png') ||
      imageFile.name.includes('.jpeg')
    ) {
      formData.append('message', imageFile.name);
      formData.append('conversation_id', currentBoxChat.id);
      formData.append('user_id', user._id);
      formData.append('image', imageFile);
      formData.append('imageName', newFileName);
      formData.append('isImage', true);
      formData.append('isFile', false);

      try {
        const res = await api.sendMessageImage(formData);
        mess_img = res.data.message_image;
        newMessToSendSocket = { ...res.data, senderImg: user.image };
        setNewMessage('');
        //update redux
        dispatch({
          type: GET_MESSAGES,
          data: [...currentMessages, res.data],
        });

        //update isRead Status of partner
        if (!currentBoxChat.isGroup) {
          await updateIsReadStatus({
            conv_id: currentBoxChat.id,
            user_id: currentBoxChat.partnerId,
            isRead: false,
          });
        } else {
          for (let i = 0; i < currentBoxChat.members.length; i++) {
            if (currentBoxChat.members[i].id !== user._id) {
              await updateIsReadStatus({
                conv_id: currentBoxChat.id,
                user_id: currentBoxChat.members[i].id,
                isRead: false,
              });
            }
          }
        }

        const resOfConvs = await updateListConv(user._id);
        dispatch({ type: GET_CONVERSATION, data: resOfConvs.data });
        //update list IMG of this Conversation
        dispatch({
          type: SET_CURRENT_CHAT,
          data: {
            ...currentBoxChat,
            imageList: [
              {
                message_id: newMessToSendSocket._id,
                image: mess_img,
                sendAt: Date.now(),
                sender: user._id,
              },
              ...currentBoxChat.imageList,
            ],
            lastMessage: newMessToSendSocket.isImage
              ? '[Photo]'
              : res.data.message,
            lastMessageId: newMessToSendSocket._id,
            lastSendAt: newMessToSendSocket.createdAt,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      formData.append('message', imageFile.name);
      formData.append('conversation_id', currentBoxChat.id);
      formData.append('user_id', user._id);
      formData.append('image', imageFile);
      formData.append('imageName', newFileName);
      formData.append('isImage', false);
      formData.append('isFile', true);

      try {
        const res = await api.sendMessageImage(formData);
        mess_img = res.data.message_image;
        mess_file = res.data.user_image;
        newMessToSendSocket = { ...res.data, senderImg: user.image };
        setNewMessage('');
        //update redux
        dispatch({
          type: GET_MESSAGES,
          data: [...currentMessages, res.data],
        });

        //update isRead Status of partner
        if (!currentBoxChat.isGroup) {
          await updateIsReadStatus({
            conv_id: currentBoxChat.id,
            user_id: currentBoxChat.partnerId,
            isRead: false,
          });
        } else {
          for (let i = 0; i < currentBoxChat.members.length; i++) {
            if (currentBoxChat.members[i].id !== user._id) {
              await updateIsReadStatus({
                conv_id: currentBoxChat.id,
                user_id: currentBoxChat.members[i].id,
                isRead: false,
              });
            }
          }
        }

        const resOfConvs = await updateListConv(user._id);
        dispatch({ type: GET_CONVERSATION, data: resOfConvs.data });
        //update list IMG of this Conversation
        dispatch({
          type: SET_CURRENT_CHAT,
          data: {
            ...currentBoxChat,
            fileList: [
              {
                message_id: newMessToSendSocket._id,
                file: mess_file,
                message: res.data.message,
                sendAt: Date.now(),
                sender: user._id,
              },
              ...currentBoxChat.fileList,
            ],
            lastMessage: newMessToSendSocket.isImage
              ? '[File]'
              : res.data.message,
            lastMessageId: newMessToSendSocket._id,
            lastSendAt: newMessToSendSocket.createdAt,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (!currentBoxChat.isGroup) {
      //send action to one user
      const receiver = currentBoxChat.members.find(
        (member) => member.id !== user._id
      );
      sendImage(receiver.id, newMessToSendSocket, currentBoxChat.isGroup);
    } else {
      //send action to users
      const receivers = currentBoxChat.members.filter(
        (member) => member.id !== user._id
      );
      sendImage(receivers, newMessToSendSocket, currentBoxChat.isGroup);
    }
  };

  //Web socket (add user to list)
  const handleKeypress = (even) => {
    if (even.key === 'Enter' && even.shiftKey) {
    } else if (even.key === 'Enter') {
      even.preventDefault();
      handleSend(even);
    }
  };

  const handleChangeInputMessage = (e) => setNewMessage(e.target.value);

  const handleHiddingEmojiInCenterChat = (event) => {
    if (showEmoji) setShowEmoji(false);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'auto',
    });
  }, [currentMessages.length, currentBoxChat]);

  const handleFiltersChange = async (newFilters) => {
    const res = await api.userFilter(newFilters);

    if (res.data.blank) {
      setFilterResult(null);
    } else if (res.data.length === 0) {
      setFilterResult([]);
    } else {
      setFilterResult(res.data);
    }
  };

  const filterCheck = (res) => {
    if (isArray(res)) return true;
    return false;
  };

  const getConversationIdFromUserFilter = (user) => {
    //user la cai thang minh click zo
    if (!!listConversation) {
      const conversationOfPartner = listConversation.find(
        (conv) => conv.partnerId === user._id
      );

      if (conversationOfPartner) {
        return conversationOfPartner;
      } else {
        return {
          partnerId: user._id,
          partnerName: user.full_name,
          partnerAvt: user.image,
          partnerEmail: user.email,
          imageList: [],
        };
      }
    } else {
      return {
        partnerId: user._id,
        partnerName: user.full_name,
        partnerAvt: user.image,
        partnerEmail: user.email,
        imageList: [],
      };
    }
  };

  const hancleCallVideo = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (call.isReceivingCall) {
      setOpen(true);
    }
  }, [call]);

  useEffect(() => {
    if (open) {
      document.getElementById('button').click();
    }
    onCamera();
  }, [open]);

  useEffect(() => {
    let seconds;
    let minutes;
    if (isLeave) {
      seconds =
        (('0' + Math.floor((time / 60000) % 60)).slice(-2),
        ':',
        ('0' + Math.floor((time / 1000) % 60)).slice(-2));
      minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2);
    }
    setNewMessage(time === 0 ? '' : `Call Video 📞 ${minutes}min ${seconds}s`);
  }, [time]);

  return (
    <>
      <div className='chat'>
        <div className='chat__menu'>
          <div className='chat__menu--wrapper'>
            <SearchForm onSubmit={handleFiltersChange} finder={user._id} />
            {filterResult ? (
              <div className='search__result'>
                {filterCheck(filterResult) && (
                  <div className='search__result--count py-2 px-4'>
                    <p>Found {filterResult.length} users</p>
                  </div>
                )}
                <div className='search__result--list'>
                  <ul className='p-0'>
                    {filterCheck(filterResult) ? (
                      filterResult.map((user, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleSetCurrentChat(
                              getConversationIdFromUserFilter(user)
                            )
                          }
                          className='p-0'
                        >
                          <div className='search__result--item d-flex p-2'>
                            <div className='search__result--image w-25'>
                              <img
                                className='search__result--avatar'
                                width='45'
                                height='45'
                                src={user.image}
                                alt=''
                              />
                            </div>
                            <div className='search__result--info'>
                              <div className='search__result--name'>
                                <span>{user.full_name}</span>
                              </div>
                              <div className='search__result--mail mt-1'>
                                <span>{user.email}</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className='search__result--nores px-3 py-2'>
                        {filterResult.mess}
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <></>
            )}
            <Conversation />
            <Popup
              contentStyle={{
                width: '100%',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: 'none',
              }}
              modal
              trigger={
                <button
                  className='chat__box--topButton my-2 my-sm-0'
                  id='button'
                />
              }
            >
              <CallNotification
                leaveCall={() =>
                  leaveCall(
                    call.from,
                    newMessage,
                    call.currentBoxChat,
                    updateIsReadStatus,
                    setNewMessage,
                    updateListConv
                  )
                }
              />
            </Popup>
          </div>
        </div>
        {currentBoxChat ? (
          <>
            <div className='chat__box'>
              <div
                className='chat__box--wrapper'
                style={{
                  backgroundImage: `url(${user?.dashboard_bg_color})`,
                  height: '100%',
                  backgroundSize: 'cover',
                }}
              >
                <div className='chat__box--top'>
                  <nav className='chat__box--topNav navbar  navbar-light px-2'>
                    <div>
                      <img
                        crossOrigin='anonymous'
                        src={currentBoxChat.partnerAvt}
                        alt=''
                        className='conversation__img'
                      />
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href='#' className='navbar-brand'>
                        {currentBoxChat.partnerName}
                      </a>
                    </div>
                    <div className='justify-self-end' id='navbarTogglerDemo03'>
                      <Popup
                        contentStyle={{
                          width: '100%',
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        modal
                        trigger={
                          !currentBoxChat.isGroup && (
                            <button
                              className='chat__box--topButton my-2 my-sm-0'
                              onClick={hancleCallVideo}
                            >
                              <VideoCallOutlined />
                            </button>
                          )
                        }
                      >
                        {(close) => (
                          <CallVideo
                            close={close}
                            leaveCall={() =>
                              leaveCall(
                                currentBoxChat.partnerId,
                                newMessage,
                                currentBoxChat.id,
                                updateIsReadStatus,
                                setNewMessage,
                                updateListConv
                              )
                            }
                          />
                        )}
                      </Popup>

                      <button
                        className='chat__box--topButton my-2 my-sm-0'
                        type='submit'
                        onClick={handleCheckMore}
                      >
                        <MoreHoriz />
                      </button>
                    </div>
                  </nav>
                </div>
                <div
                  onClick={handleHiddingEmojiInCenterChat}
                  className='chat__box--center'
                >
                  {currentMessagesLoading ? (
                    <Spinner />
                  ) : (
                    <div>
                      {currentMessages.map((m, index) => (
                        <div ref={scrollRef} key={index}>
                          <Message mess={m} own={m.user_id !== user._id} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {showEmoji && (
                  <div className='chat__box--emojiPicker'>
                    <EmojiPicker onSelect={handleSelectEmoji} emojiSize={20} />
                  </div>
                )}
                <div className='chat__box--bottom py-3'>
                  <div className='chat__box--emoji p-2'>
                    <label className='pointer_on' htmlFor='add-image'>
                      <AttachFile htmlFor='add-image' />
                    </label>
                    <input
                      type='file'
                      id='add-image'
                      onChange={handleSendImage}
                      style={{ display: 'none' }}
                    />
                  </div>

                  <button
                    type='button'
                    className='chat__box--emoji p-2'
                    onClick={handleShowEmoji}
                  >
                    <Mood />
                  </button>

                  <TextArea
                    onClick={() => setThisChatToReaded(currentBoxChat, true)}
                    rows={1}
                    className='chat__box--input'
                    placeholder='write something...'
                    contentEditable='true'
                    suppressContentEditableWarning={true}
                    onChange={handleChangeInputMessage}
                    onKeyPress={handleKeypress}
                    value={newMessage}
                    //ref={inputRef}
                  />
                  {newMessage ? (
                    <button
                      className='chat__box--submitButton'
                      onClick={handleSend}
                    >
                      <Send />
                    </button>
                  ) : (
                    <button className='chat__box--submitButtonNoText'>
                      <Send />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* File and member bla ba */}
            {checkMore ? (
              <div className='chat__online'>
                <div className='container p-3 d-flex justify-content-center'>
                  <div>
                    <div className='image d-flex flex-column justify-content-center align-items-center'>
                      <img
                        crossOrigin='anonymous'
                        src={currentBoxChat.partnerAvt}
                        alt=''
                        className='chat__online--img'
                      />
                      <span className='name mt-3'>
                        {currentBoxChat.partnerName}
                      </span>
                      {/* <span className='idd'>Active 3 hours ago</span> */}
                    </div>
                  </div>
                </div>
                <hr />
                <div className='chat__online--file'>
                  <div className='chat__online--title'>Image</div>

                  <div className='chat__profile'>
                    <div className='chat__profile--imglist d-flex flex-wrap justify-content-start align-content-start'>
                      {currentBoxChat?.imageList?.length > 0 &&
                        currentBoxChat.imageList.map((i) => (
                          <ConversationImageList img={i.image} key={i} />
                        ))}
                    </div>
                  </div>
                </div>
                <hr />
                <div className='chat__online--file'>
                  <div className='chat__online--title'>File</div>

                  <div className='chat__profile'>
                    <div className='chat__profile--imglist d-flex flex-wrap justify-content-start align-content-start'>
                      {currentBoxChat?.fileList?.length > 0 &&
                        currentBoxChat.fileList.map((i) => (
                          <ConversationFileList file={i} key={i} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            <div className='w-75'>
              <NoChat backgr={user?.dashboard_bg_color} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const ConversationImageList = ({ img }) => {
  return (
    <div className='chat__profile--imgContainer mb-1'>
      <Popup
        overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
        contentStyle={{
          width: 'auto',
          maxHeight: '640px',
          borderRadius: '5px',
          backgroundColor: 'transparent',
          border: 'none',
        }}
        modal
        trigger={<img className='chat__profile--img' src={img} alt={img} />}
      >
        {(close) => <MessageFullSize close={close} img={img} />}
      </Popup>
    </div>
  );
};
const ConversationFileList = ({ file }) => {
  return (
    <div className=''>
      <a
        href={file.file}
        download
        target='blank'
        className='chat__profile--file'
      >
        <InsertDriveFile />
        <div className='ellipsis reverse-ellipsis chat__profile--title'>
          <span>{file.message}</span>
        </div>
      </a>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className='message__spinner'>
      <div className='d-flex justify-content-center'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
