import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import axios from "axios";


// This the whole components in which all msgs are visible
export default function ChatContainer({ socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    
    const fetchMessages = async () => {
      const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  
      try {
        const response = await axios.post(recieveMessageRoute, { from: data._id });
        setMessages(response.data);  
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };
  
    fetchMessages();
  }, []);
  
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    // console.log(data);
    
    const messageData = {
      from: data,
      message: msg,
    };
     
    socket.emit("send-msg", messageData);
    
    await axios.post(sendMessageRoute, messageData);

    // real time message updation - sender side
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket) {
      const handleMessage = (msg) => {
        
        setArrivalMessage({ 
          fromSelf: false, 
          message: msg.message,
          sender: msg.from
        });
      };
      // Recieve broadcast msg - time to update msgs list
      socket.on("msg-recieve", handleMessage);
  
      return () => {
        socket.off("msg-recieve", handleMessage);
      };
    }
  }, []);
  
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <h1>Group Chat</h1>
        <Logout socket={socket}/>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          const content = typeof message.message === "string" ? message.message : JSON.stringify(message.message);
          return (
            <div 
              ref={index === messages.length - 1 ? scrollRef : null} 
              key={uuidv4()}
            >
              <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                <div className="content">
                  {!message.fromSelf && message.sender && (
                    <div className="user-details">
                      <img
                        src={message.sender.avatar ? `data:image/svg+xml;base64,${message.sender.avatar}` : `data:image/svg+xml;base64,${message.sender.avatarImage}`}
                        alt="avatar"
                      />
                      <h4 className="username">{message.sender.username}</h4>
                    </div>
                  )}
                  <p className="message-text">{content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background: linear-gradient(135deg, #1e566b, #112d38);
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  height: 100%;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  @media screen and (max-width: 720px) {
    grid-template-rows: 10% 80% 10%;
    border-radius: 0;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .user-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    h4 {
      margin: 0;
      font-weight: bold;
      color: #D3D3D3;
      font-size: 0.9rem;
    }
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0c3a4d;
    color: #fff;
    padding: 0 2rem;
    border-bottom: 2px solid #004c6d;

    @media screen and (max-width: 720px) {
      padding: 0 1rem;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      

      @media screen and (max-width: 720px) {
        font-size: 1.2rem;
        padding-left: 100px;
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    background: #112d38;
    border-radius: 1rem;

    @media screen and (max-width: 720px) {
      padding: 1rem;
    }

    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #007ca6;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      margin-bottom: 1rem;

      .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 1rem;
        border-radius: 1rem;
        color: #fff;
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', sans-serif;
        background: rgba(0, 140, 197, 0.8);
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

        @media screen and (max-width: 720px) {
          max-width: 80%;
          padding: 0.75rem;
          font-size: 0.9rem;
        }
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background: #006d9b;
        align-items: flex-end;
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background: #004c6d;
        align-items: flex-start;
      }
    }
  }
`;