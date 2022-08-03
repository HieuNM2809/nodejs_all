import React from 'react';
import './nochat.scss';

const NoChat = ({ backgr }) => {
  return (
    <>
      <div className='noCurrentChat'>
        <img
          crossOrigin='anonymous'
          className='noCurrentChat__img'
          alt={backgr}
          src={backgr}
        />
        <div className='noCurrentChat__abs'>
          Select a chat to start messaging
        </div>
      </div>
    </>
  );
};

export default NoChat;
