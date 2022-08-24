import React, { useRef, useState } from 'react';
import { EmojiIcon } from '../../../assets/icon';
import { ChooseEmojiWrapper } from './ChooseEmoji.style';

const ChooseEmoji = ({ setContent,id }) => {
    const emojiRef = useRef();
    const reactions = [
        '❤️',
        '😆',
        '😯',
        '😢',
        '😡',
        '👍',
        '👎',
        '😄',
        '😂',
        '😍',
        '😘',
        '😗',
        '😚',
        '😳',
        '😭',
        '😓',
        '😤',
        '🤤',
        '👻',
        '💀',
        '🤐',
        '😴',
        '😷',
        '😵',
    ];

    return (
        <ChooseEmojiWrapper attr-id={id}>
            
                    <EmojiIcon onClick={() => emojiRef.current.focus()}/>
                   
                    <input ref={emojiRef} className={'emoji'}  type="text" id={id}/>
                    <label htmlFor={id}
                        className="icons__list"
                    >
                        <p>Chọn cảm xúc</p>
                        <div  onMouseDown={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                        }}  className="reactions">
                            {reactions.map((icon) => (
                                <span
                                key={icon}
                                onMouseDown={(e) =>{
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setContent(
                                        icon
                                    )
                                    }
                                    }
                                >
                                    {icon}
                                </span>
                            ))}
                        </div>
                    </label>
        </ChooseEmojiWrapper>
    );
};

export default ChooseEmoji;
