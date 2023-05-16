import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import '../Home.css';


// const baseUrl = 'http://localhost:3001'
const baseUrl = 'https://kids-calender-server.onrender.com';

const Register = ({ setshowRegister }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${baseUrl}/auth/register`, {
                username,
                password,
            });
            toast.success("Registration Completed! Now login.");
            setshowRegister(false);

        } catch (error) {
            console.error(error);
            toast.error("Username already exists or registration details are missing!");
        }
    };

    return (
        <div className="register-container">
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
                    <button className="submit-register yellow" onClick={() => setshowRegister(false)} >Back</button>
                </div>
            </form>
        </div>
    );
};


export default Register