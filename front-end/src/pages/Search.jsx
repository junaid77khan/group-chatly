import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Search() {
    const [input, setInput] = useState('');
    const[dInput, setDInput] = useState('');

    const newFun = async(searchValue) => {
        console.log("called");
        let curInput = searchValue;
        const res = await axios.get('https://api.restful-api.dev/objects');
        console.log('For - ', curInput, ' ');
        console.log(res);
        return res;
        
    }

    useEffect(() => {
        const response = setTimeout(() => {
            setDInput(input);
        }, 1000);

        return () => {
            clearTimeout(response);
        }
    }, [input])

    useEffect(() => {
        if(dInput) {
            newFun(dInput);
        }
    }, [dInput])

    const handle = async (e) => {
        setInput(e.target.value);
    }

    return (
        <Container>
            <div className="container">
                <input placeholder="Search" className="input" value={input} onChange={handle} />
            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    .input {
        padding: 2px;
    }
`