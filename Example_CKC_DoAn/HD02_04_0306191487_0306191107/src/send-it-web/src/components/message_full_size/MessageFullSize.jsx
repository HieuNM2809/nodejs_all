import { FullscreenExit } from '@material-ui/icons';
import React, { useState } from 'react';
import './message_full_size.scss';

const MessageFullSize = ({ close, img }) => {
  return (
    <>
      <div className='messimg'>
        <FullscreenExit className='messimg__exit' onClick={close} />
        <img className='message__image--fullsize' src={img} alt={img} />
      </div>
    </>
  );
};

export default MessageFullSize;
