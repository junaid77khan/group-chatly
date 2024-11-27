import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import loader from "../assets/loader.gif"; // Import the loader gif

// This is main component in which we have - chatContainer, chat-input and contacts
export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [curUser, setCurUser] = useState(undefined);
  const [socketConnected, setSocketConnected] = useState(false);

  // Check user is authenticated or not - otherwise navigate to login
  // For authentication we are checking key in local storage, which is stored at the time of login
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

  // After setting curUser, we will set some attributes in socket.
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
            <img src={loader} alt="loading" className="loader-img" />
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
    height: 100vh;
    background: #131324;
    ${'' /* background: radial-gradient(circle, rgba(0,181,255,1) 3%, rgba(0,174,245,1) 9%, rgba(43,49,49,1) 100%); */}

    h2 {
      font-size: 1.5rem;
      font-weight: 500;
    }

    .loader-img {
      max-inline-size: 100%;
      max-block-size: 50px;
    }
  }
`;

