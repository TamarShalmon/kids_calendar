import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import '../Home.css';

const REGISTER_TOAST_CONFIG = {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};

const Register = ({ setshowRegister }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            toast.success("Registration Completed! Now login.", REGISTER_TOAST_CONFIG);
            setshowRegister(false);

        } catch (error) {
            console.error(error);
            toast.error("Username already exists or registration details are missing!", REGISTER_TOAST_CONFIG);
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