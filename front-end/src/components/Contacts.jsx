import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { allUsersRoute } from "../utils/APIRoutes";
import axios from "axios";

export default function Contacts({ socket, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    console.log(data);
    
    setContacts(data.data);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    if (data) {
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    fetchContacts();
  }, []);

  useEffect(() => {
    if (socket) {
      const handleUserAdded = () => {
        fetchContacts();
      };
      const handleUserRemoved = () => {
        fetchContacts();
      };

      socket.on("user-added", handleUserAdded);
      socket.on("user-removed", handleUserRemoved);

      return () => {
        socket.off("user-added", handleUserAdded);
      };
    }
  }, [socket, fetchContacts]);

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          <div className="contacts">
            <h1>Online users</h1>
            {(Array.isArray(contacts) && contacts.length > 0) ? (
              contacts.map((contact, index) => {
                return (
                  (contact._id != currentUser._id && <div
                    key={contact._id}
                    className={`contact ${index === currentSelected ? "selected" : ""}`}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>)
                );
              })
            ) : (
              <p>No online users</p>
            )}
          </div>
          <div className="brand">
            <img className="logo1" src={Logo} alt="logo" />
            <h3>Chatly</h3>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  background: linear-gradient(135deg, #00b4db, #0083b0);
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2.5rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-size: 1.5rem;
      letter-spacing: 2px;
      font-weight: bold;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #ffffff60;
        border-radius: 0.5rem;
      }
    }

    .contact {
      background-color: rgba(255, 255, 255, 0.2);
      min-height: 5rem;
      cursor: pointer;
      width: 85%;
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      gap: 1.5rem;
      align-items: center;
      transition: 0.3s ease-in-out;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      .avatar img {
        height: 3rem;
        border-radius: 50%;
        border: 2px solid white;
      }

      .username h3 {
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
      }

      &:hover {
        transform: scale(1.05);
        background-color: #0073a6;
      }
    }

    .selected {
      background-color: #0073a6;
      transform: scale(1.05);
    }

    p {
      color: white;
      font-size: 1.2rem;
      margin-top: 2rem;
    }
  }

  .current-user {
    background-color: rgba(0, 140, 197, 0.8);
    padding: 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

    .avatar img {
      height: 4rem;
      border-radius: 50%;
      border: 2px solid white;
    }

    .username h2 {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username h2 {
        font-size: 1rem;
      }
    }
  }
`;
