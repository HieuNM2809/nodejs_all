import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../../actions/context';
import './callNotification.scss';
import { Call, CallEnd, NoMeetingRoom, PhotoCamera } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import soundCall from '../../sound/soundCall.mp3';
const CallNotification = ({ leaveCall }) => {
  const {
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    answerCall,
  } = useContext(SocketContext);

  const [checkCam, setCheckCam] = useState(true);
  const [checkMic, setCheckMic] = useState(true);
  const [audio] = useState(new Audio(soundCall));
  const currentBoxChat = useSelector(
    (state) => state.conversationReducer.currentChatData
  );

  const handleHideCam = () => {
    stream.getVideoTracks()[0].enabled = !checkCam;
    setCheckCam(!checkCam);
  };
  const handleMute = () => {
    stream.getAudioTracks()[0].enabled = !checkMic;
    setCheckMic(!checkMic);
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      audio.play();
      audio.loop = true;
    } else {
      audio.pause();
    }
  }, [call.isReceivingCall, callAccepted]);

  return (
    <div className='notify'>
      {call.isReceivingCall && !callAccepted && (
        <img
          crossOrigin='anonymous'
          src={call.avatar}
          alt=''
          className='notify__img'
        />
      )}
      <div className='notify__camera'>
        {callAccepted && !callEnded && (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className='notify__camera--partner'
            width={'50%'}
          />
        )}
        {stream && (
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className='call__camera--me'
            width={callAccepted && !callEnded ? '200px' : '10px'}
          />
        )}
      </div>
      {!callAccepted ? (
        ''
      ) : (
        <div>
          <Button
            variant='contained'
            startIcon={
              checkCam ? <NoMeetingRoom fontSize='large' /> : <PhotoCamera />
            }
            onClick={handleHideCam}
            className='notify__btnLeave'
          >
            {checkCam ? ' Hide Cam' : 'Show cam'}
          </Button>
          <Button
            variant='contained'
            startIcon={<CallEnd fontSize='large' />}
            onClick={leaveCall}
            className='notify__btnLeave'
          >
            Leave Call
          </Button>
        </div>
      )}
      <div className='notify__container'>
        {call.isReceivingCall && !callAccepted && (
          <>
            <h1 className='notify__title'>{call.name} is calling</h1>
            <div>
              <button
                variant='contained'
                onClick={leaveCall}
                className='notify__btnDecline'
              >
                <CallEnd />
              </button>
              <button
                variant='contained'
                onClick={answerCall}
                className='notify__btnAnswer'
              >
                <Call />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CallNotification;
