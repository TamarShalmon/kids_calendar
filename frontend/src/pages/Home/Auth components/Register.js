import React, { useContext, useEffect } from 'react'
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Login from './Login';

import '../Home.css';


const Register = () => {
    const { showLogin, showLoginToggle, username, password, usernameToggle, passwordToggle} = useContext(AuthContext);

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration Completed! Now login.");
            navigate("/")
            showLoginToggle(true);

        } catch (err) {
            console.error(err);
            //  alert("Missing Registration Details!");
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