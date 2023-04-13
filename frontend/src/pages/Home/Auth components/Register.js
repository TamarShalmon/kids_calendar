import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import Login from './Login';

import '../Home.css';


const Register = () => {
    const { showLogin, showLoginToggle, showRegisterToggle, username, password, usernameToggle, passwordToggle, cookiesToggle } = useContext(AuthContext);

    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration Completed! Now login.");
            navigate("/")
            showRegisterToggle(false);
            showLoginToggle(true);

        } catch (err) {
            console.error(err);
            alert("Username already exists or registration details are missing.!");
        }
    };

    return (
        <div className="register-container">
            {showLogin ? (<Login />) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            className='input-auth'
                            type="text"
                            id="username"
                            value={username}
                            onChange={(event) => usernameToggle(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            className='input-auth'
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => passwordToggle(event.target.value)}
                        />
                    </div>
                    <div className='btn-flex'>
                        <button className="submit-register" type="submit">Register</button>
                        <button className="submit-register yellow" onClick={() => showLoginToggle(true)} >Back</button>
                    </div>
                </form>
            )}
        </div>
    );
};


export default Register