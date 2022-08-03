import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { GET_CONVERSATION, GET_MESSAGES, SET_CURRENT_CHAT } from './actionType';
import * as api from '../API/indexAPI';
import soundMess from '../sound/soundMes.mp3';

const SocketContext = createContext();

const socket = io('http://localhost:8900');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [deletedArrivalMessage, setDeletedArrivalMessage] = useState(null);
  const [arrivalGroupChat, setArrivalGroupChat] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [arrivalEmoji, setArrivalEmoji] = useState(null);
  const [audioMess] = useState(new Audio(soundMess));
  const [onlineUsers, setOnlineUsers] = useState([]);

  const dispatch = useDispatch();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const user = useSelector((state) => state.authReducer.authData);
  const currentBoxChat = useSelector(
    (state) => state.conversationReducer.currentChatData
  );
  const currentMessages = useSelector(
    (state) => state.messageReducer.messagesData
  );
  useEffect(() => {
    if (user?._id) {
      socket.emit('addUser', user._id);
    }
    socket.on('getUsers', (users) => {
      //console.log('user online');
      //console.log(users);
    });
  }, [user]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const callUser = (id) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: user._id,
        name: user.full_name,
        currentBoxChat: currentBoxChat.id,
        avatar: user.isGoogle === undefined ? user.imageUrl : user.image,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      handleReset();
      handleStart();
      setIsLeave(true);
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    handleReset();
    handleStart();
    setIsLeave(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const onCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
        stream.getVideoTracks()[0].enabled = true;
      });
  };
  const leaveCall = (
    id,
    newMessage,
    currentBoxChatId,
    updateIsReadStatus,
    setNewMessage,
    updateListConv
  ) => {
    //console.log(newMessage);
    if (newMessage === '') {
      sendCall(
        'Cancelled Call 📞',
        currentBoxChatId,
        updateIsReadStatus,
        setNewMessage,
        updateListConv
      );
    } else {
      sendCall(
        newMessage,
        currentBoxChatId,
        updateIsReadStatus,
        setNewMessage,
        updateListConv
      );
    }
    setCallEnded(true);
    setIsLeave(true);
    handlePauseResume();
    socket.emit('leaveCall', { to: id });
    window.location.reload();

    connectionRef.current.destroy();
  };

  const getMessage = () => {
    socket.on('getMessage', (data) => {
      setArrivalMessage(data);
      audioMess.play();
    });

    socket.on('getNewPrivateChat', async (data) => {
      const res = await api.getConversation(user._id);
      dispatch({ type: GET_CONVERSATION, data: res.data });
    });

    socket.on('updateDeletedMessage', (data) => {
      setDeletedArrivalMessage(data);
    });

    socket.on('getEmojing', (data) => {
      setArrivalEmoji(data);
    });

    socket.on('getNewGroupChat', (data) => {
      setArrivalGroupChat(data);
    });

    socket.on('getCallUser', (data) => {
      setCall({
        isReceivingCall: true,
        from: data.from,
        name: data.name,
        avatar: data.avatar,
        currentBoxChat: data.currentBoxChat,
        signal: data.signal,
      });
    });
    socket.on('leaveCallAccepted', () => {
      setCallEnded(true);
      setIsLeave(true);
      handlePauseResume();

      window.location.reload();
      connectionRef.current.destroy();
    });
  };

  const sendMessage = (receiver, newMessToSendSocket, isGroup) => {
    socket.emit('sendMessage', {
      ...newMessToSendSocket,
      isGroup,
      receiverId: receiver,
    });
  };

  const sendImage = (receiver, newMessToSendSocket, isGroup) => {
    socket.emit('sendMessage', {
      ...newMessToSendSocket,
      isGroup,
      receiverId: receiver,
    });
  };

  const sendNewPrivateChat = (newConversationId, receiver) => {
    socket.emit('sendNewPrivateChat', {
      conversationId: newConversationId,
      receiverId: receiver,
    });
  };

  const createNewGroupChat = (receivers, conversationId) => {
    socket.emit('createNewGroupChat', {
      conversationId: conversationId,
      receivers: receivers,
    });
  };

  const emojingMessageSocket = (receiver, emote, isGroup) => {
    socket.emit('emojing', {
      ...emote,
      isGroup,
      receiverId: receiver,
    });
  };

  const sendCall = async (
    newMessage,
    currentBoxChatId,
    updateIsReadStatus,
    setNewMessage,
    updateListConv
  ) => {
    let newMessToSendSocket;
    const message = {
      message: newMessage,
      conversation_id: currentBoxChatId,
      user_id: user._id,
      isImage: false,
    };
    try {
      const res = await api.sendMessage(message);
      newMessToSendSocket = res.data;
      setNewMessage('');
      dispatch({
        type: GET_MESSAGES,
        data: [...currentMessages, res.data],
      });
      //update isRead Status of partner
      await updateIsReadStatus({
        conv_id: currentBoxChatId,
        user_id: currentBoxChat.partnerId,
        isRead: false,
      });

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
    const receiver = currentBoxChat.members.find(
      (member) => member.id !== user._id
    );

    sendMessage(receiver.id, newMessToSendSocket);
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        time,
        isLeave,
        setName,
        callEnded,
        callUser,
        leaveCall,
        answerCall,
        arrivalMessage,
        getMessage,
        sendMessage,
        sendImage,
        sendNewPrivateChat,
        deletedArrivalMessage,
        arrivalEmoji,
        emojingMessageSocket,
        onCamera,
        audioMess,
        arrivalGroupChat,
        createNewGroupChat,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
