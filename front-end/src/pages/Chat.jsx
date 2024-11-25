import React, { useEffect, useState, useRef } from "react";
import { json, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [curUser, setCurUser] = useState(undefined);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
      }
    };
    loadUser();
  }, [navigate]);

  useEffect(() => {
    if(curUser) {
      socket.current = io(host);
      socket.current.emit("add-user", curUser._id);
      socket.current.on("user-added", () => {
        setSocketConnected(true);
      });
    }
  }, [curUser]);

  return (
    <Container>
      <div className="container">
        {socketConnected ? (
          <>
            <Contacts socket={socket.current} currentUser={curUser} />
            <ChatContainer socket={socket.current} />
          </>
        ) : (
          <div className="loader">
            <div className="spinner"></div>
            <h2>Loading Environment</h2>
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 100vh;
    width: 100vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

  .loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: white;
    width: 100vw;
    background: rgb(0,181,255);
    background: radial-gradient(circle, rgba(0,181,255,1) 3%, rgba(0,174,245,1) 9%, rgba(43,49,49,1) 100%);

    h2 {
      font-size: 1.5rem;
      font-weight: 500;
    }

    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid #ffffff;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
