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
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background: rgb(0,181,255);
  background: radial-gradient(circle, rgba(0,181,255,1) 3%, rgba(0,174,245,1) 9%, rgba(43,49,49,1) 100%);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    margin-top: 2rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #008cc5;
    }
  }

  .current-user {
    background-color: #008cc5;
    padding: 2rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3.4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
