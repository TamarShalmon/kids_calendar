import React, { useContext, useState } from 'react'
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Register from './Register';
import Welcome from './Welcome';

import '../Home.css';

const Login = () => {

    const { showWelcome, showRegister, showWelcomeToggle, showRegisterToggle, cookiesToggle, username, password, usernameToggle, passwordToggle } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });

            cookiesToggle("access_token", result.data.token);
            localStorage.setItem("userID", result.data.userID);
            showWelcomeToggle(true)
        } catch (error) {
            alert("Username or password is incorrect.");
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            {showRegister ? <Register /> : (
                showWelcome ? <Welcome /> : (
                    <>
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
                                <button className='submit-login login' type="submit">Login</button>
                                <button className='submit-login yellow' onClick={() => showRegisterToggle(true)}>Create an account</button>
                                <button type="button" className='submit-login yellow'>Login as a guest</button>
                            </div>
                        </form>
                    </>
                ))}
        </div>
    );
};


export default Login