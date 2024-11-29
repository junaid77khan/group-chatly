import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
        navigate("/setAvatar");
      }
      setLoading(false);
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
            placeholder="Enter your Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" disabled={loading}>
            {loading ? <span className="loader"></span> : "Create Account"}
          </button>
          <span>
            Already have an account? <Link to="/login">Login.</Link>
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
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #4e0eff;
    }
    &:disabled {
      cursor: not-allowed;
      background-color: #2e0ca6;
    }
  }

  .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid junaidk2;
    border-radius: 50%;
    width: 16px;
    height: 16px;
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
`;
