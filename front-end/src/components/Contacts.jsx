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
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const fetchContacts = async () => {
    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
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
        socket.off("user-removed", handleUserRemoved);
      };
    }
  }, [socket, fetchContacts]);

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <>
      <ToggleButton onClick={toggleSlider} $isOpen={isSliderOpen}>
        <span></span>
        <span></span>
        <span></span>
      </ToggleButton>

      {currentUserImage && currentUserName && (
        <Container $isOpen={isSliderOpen}>
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
                  (contact._id !== currentUser._id && (
                    <div
                      key={contact._id}
                      className={`contact ${index === currentSelected ? "selected" : ""}`}
                      onClick={() => {
                        setCurrentSelected(index);
                        // Close slider on mobile after selection
                        if (window.innerWidth <= 720) {
                          setIsSliderOpen(false);
                        }
                      }}
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
                    </div>
                  ))
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

const ToggleButton = styled.button`
  display: none;
  
  @media screen and (max-width: 720px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1001;
    width: 45px;
    height: 45px;
    background-color: #00b4db;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: left 0.3s ease-in-out, background-color 0.3s ease;
    left: ${props => props.$isOpen ? '70%' : '15px'};
    transform: ${props => props.$isOpen ? 'translateX(-50%)' : 'translateX(0)'};

    span {
      width: 30px;
      height: 3px;
      background-color: white;
      margin: 4px 0;
      transition: all 0.3s ease;
      transform-origin: left;

      &:nth-child(1) {
        transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'rotate(0)'};
      }
      &:nth-child(2) {
        opacity: ${props => props.$isOpen ? '0' : '1'};
      }
      &:nth-child(3) {
        transform: ${props => props.$isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }

    &:hover {
      background-color: #0083b0;
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  background: linear-gradient(135deg, #0083b0, #005f80);
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 720px) {
    position: fixed;
    top: 0;
    left: ${props => props.$isOpen ? '0' : '-100%'};
    width: 80%;
    height: 100%;
    z-index: 1000;
    transition: left 0.3s ease-in-out;
  }

  /* Rest of the existing styles remain the same */
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-size: 1.6rem;
      letter-spacing: 2px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
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
     h1 {
      color: white;
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 1rem;
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
      backdrop-filter: blur(10px);

      .avatar img {
        height: 3rem;
        border-radius: 50%;
        border: 2px solid white;
        transition: transform 0.2s ease;
      }

      .username h3 {
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
      }

      &:hover {
        transform: scale(1.05);
        background-color: rgba(0, 115, 166, 0.8);
      }

      .selected {
        background-color: rgba(0, 115, 166, 0.8);
        transform: scale(1.05);
      }
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
    border-bottom: 2px solid white;

    .avatar img {
      height: 4rem;
      border-radius: 50%;
      border: 2px solid white;
      transition: transform 0.2s ease;
    }

    .username h2 {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
    }
  }
`;

