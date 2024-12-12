import React from 'react'
import {useState} from 'react';
import Picker from 'emoji-picker-react';
import "./EmojiDisplay.css";

const EmojiDisplay = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
  };

  return (
    <div>{chosenEmoji ? (
      <>
      <span id="chosen-emoji"> Today's Emoji: 
          <img
              id="emoji"
              src={chosenEmoji.target.src}
          />
      </span>
      </>
       ) : (
      <span id="pick-emoji">Pick an Emoji!</span>
      )}
  <Picker width={500} height={350} onEmojiClick={onEmojiClick} />
  </div>
  )
}

export default EmojiDisplay