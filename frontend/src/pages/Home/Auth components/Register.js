import React, { useContext, useState } from 'react'
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import Login from './Login';

import '../Home.css';


const Register = () => {
    const { showLogin, showLoginToggle } = useContext(AuthContext);


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration Completed! Now login.");
            showLoginToggle(true);

        } catch (error) {
            console.error(error);
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
                        <button className="submit-register" type="submit">Register</button>
                        <button className="submit-register yellow" onClick={() => showLoginToggle(false)} >Back</button>
                    </div>
                </form>
            )}
        </div>
    );
};


export default Register