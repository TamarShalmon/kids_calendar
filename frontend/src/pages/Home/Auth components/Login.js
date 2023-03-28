import React, { useContext, useState } from 'react'
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import Register from './Register';
import Welcome from './Welcome';

import '../Home.css';

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);

    const { showWwlcome, showRegister, showWwlcomeToggle, showRegisterToggle } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });

            setCookies("access_token", result.data.token);
            window.localStorage.setItem("userID", result.data.userID);
            showWwlcomeToggle(true)
        } catch (error) {
            alert("Username or password is incorrect.");
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            {showRegister ? <Register /> : (
                showWwlcome ? <Welcome /> : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    className='input-auth'
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    className='input-auth'
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
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