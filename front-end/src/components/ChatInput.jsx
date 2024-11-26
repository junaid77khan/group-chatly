import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
      setShowEmojiPicker(false);
    }
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current && 
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <div className="button-container">
        <div className="emoji" ref={emojiPickerRef}>
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-wrapper">
              <Picker 
                onEmojiClick={(emojiObject) => {
                  handleEmojiClick(emojiObject);
                }} 
                height={350}
                width={300}
              />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #008CC5;
  padding: 0.5rem 1rem;
  border-radius: 14px;
  
  @media screen and (min-width: 320px) and (max-width: 480px) {
    grid-template-columns: 10% 90%;
    padding: 0.3rem 0.6rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    position: relative;

    .emoji {
      position: relative;
      
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.1);
        }
      }

      .emoji-picker-wrapper {
        position: absolute;
        bottom: 100%;
        left: 0;
        z-index: 1000;
        
        @media screen and (max-width: 480px) {
          left: -50%;
          transform: scale(0.7);
          transform-origin: bottom left;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 2rem;
    position: relative;
    padding-right: 50px; // Space for send button

    input {
      flex-grow: 1;
      background-color: transparent;
      color: black;
      border: none;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      
      &::placeholder {
        color: #888;
      }

      &:focus {
        outline: none;
      }

      @media screen and (max-width: 480px) {
        font-size: 0.9rem;
        padding: 0.5rem;
      }
    }

    button {
      position: sticky;
      bottom: 0;
      z-index: 100;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #1E566B;
      border: none;
      border-radius: 2rem;
      width: 60px;
      height: 40px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #14414f;
      }

      svg {
        font-size: 1.5rem;
        color: white;
      }

      @media screen and (max-width: 480px) {
        height: 35px;

        svg {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default ChatInput;