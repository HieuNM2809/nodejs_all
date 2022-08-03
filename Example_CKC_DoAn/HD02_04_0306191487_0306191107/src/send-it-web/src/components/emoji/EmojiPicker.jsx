import React, { useEffect, useRef } from 'react';
import data from '@emoji-mart/data';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = ({ onSelect, emojiSize }) => {
  return (
    <div>
      <Picker
        title='Pick your emoji...'
        emoji='point_up'
        set='twitter'
        onSelect={onSelect}
        emojiSize={emojiSize}
      />
    </div>
  );
};

export default EmojiPicker;
