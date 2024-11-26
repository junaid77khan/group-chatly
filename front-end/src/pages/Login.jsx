import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Chatly</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Register Now.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: url('https://imgs.search.brave.com/cp3OEplyW_DQcyon3MO9ScspkCIK9sYgBBaudnapySs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvNzMz/MTU4MS5qcGc');
 
  padding: 2rem 1rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
      border-radius: 50%;
      max-width: 100%;
    }
    h1 {
      color: #ffffff;
      text-transform: uppercase;
      font-size: 2rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: transparent;
    border-radius: 1.5rem;
    padding: 3rem 2rem;
    width: 100%;
    max-width: 400px;
  }

  input {
    background-color: #ffffff;
    padding: 1rem;
    border: 1px solid #4015ff;
    border-radius: 1rem;
    color: #333;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border-color: #100;
      outline: none;
    }
  }

  button {
    background-color: #4015ff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 1rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #4e0eff;
    }
  }

  span {
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.9rem;
    a {
      color: #4015ff;
      text-decoration: none;
      font-weight: bold;
    }
  }

  @media screen and (max-width: 768px) {
    .brand h1 {
      font-size: 1.5rem;
    }

    form {
      padding: 2rem 1.5rem;
      width: 90%;
      max-width: 350px;
    }

    input {
      padding: 0.8rem;
    }

    button {
      padding: 0.8rem 1.5rem;
      font-size: 0.9rem;
    }

    span {
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 480px) {
    .brand h1 {
      font-size: 1.2rem;
    }

    form {
      padding: 1.5rem;
      width: 90%;
      max-width: 300px;
    }

    input {
      padding: 0.8rem;
      font-size: 0.9rem;
    }

    button {
      padding: 0.7rem 1.5rem;
      font-size: 0.9rem;
    }

    span {
      font-size: 0.7rem;
    }
  }
`;
