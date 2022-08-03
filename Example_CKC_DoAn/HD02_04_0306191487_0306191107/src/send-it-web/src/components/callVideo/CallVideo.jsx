import './callVideo.scss';
import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../actions/context';
import { Button } from '@material-ui/core';
import { CallEnd, NoMeetingRoom, PhotoCamera } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import './callVideo.scss';
import { useState } from 'react';

const CallVideo = ({ leaveCall }) => {
  const currentBoxChat = useSelector(
    (state) => state.conversationReducer.currentChatData
  );

  const { callAccepted, myVideo, userVideo, callEnded, stream, callUser } =
    useContext(SocketContext);

  const [checkCam, setCheckCam] = useState(true);
  const [checkMic, setCheckMic] = useState(true);

  useEffect(() => {
    callUser(currentBoxChat.partnerId);
  }, []);

  const handleHideCam = () => {
    stream.getVideoTracks()[0].enabled = !checkCam;
    setCheckCam(!checkCam);
  };

  return (
    <div className='call'>
      <div className='call__camera'>
        {callAccepted && !callEnded && (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className='call__camera--partner'
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
            width={'200px'}
          />
        )}
      </div>
      <div>
        <Button
          variant='contained'
          startIcon={
            checkCam ? <NoMeetingRoom fontSize='large' /> : <PhotoCamera />
          }
          onClick={handleHideCam}
          className='call__btnLeave'
        >
          {checkCam ? ' Hide Cam' : 'Show cam'}
        </Button>
        <Button
          variant='contained'
          // color='secondary'
          startIcon={<CallEnd fontSize='large' />}
          onClick={leaveCall}
          className='call__btnLeave'
        >
          Leave Call
        </Button>
        {/* <Button
          variant='contained'
          // color='secondary'
          onClick={handleMute}
          className='call__btnLeave'
        >
          {checkMic ? <MicOff /> : <Mic />}
        </Button> */}
      </div>
    </div>
  );
};

export default CallVideo;
