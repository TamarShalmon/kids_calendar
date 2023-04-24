import React, { useContext, useState } from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserContext } from "../../../context/UserContext";
import { toast } from 'react-toastify';
import '../Home.css';
import apiReq from '../../../global/apiReq';

const Login = ({ setshowRegister }) => {
    const { login } = useContext(UserContext);
    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin({ username, password });
    };

    const handleLogin = async (data) => {
        try {
            const result = await apiReq({ url: 'auth/login', data, method: "POST" });
            console.log(result);
            login(result)
            setCookies("access_token", result.token);
            localStorage.setItem("userID", result.userID);
            localStorage.setItem("mainUser", JSON.stringify(result));
            // const result = await axios.post("http://localhost:3001/auth/login", items);
            // login(result.data)
            // setCookies("access_token", result.data.token);
            // localStorage.setItem("userID", result.data.userID);
            // localStorage.setItem("mainUser", JSON.stringify(result.data));
        } catch (error) {
            // toast.error("Username or password is incorrect!", {
            //     position: "top-left",
            //     autoClose: 5000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            // });
            // console.error(error);
        }
    };

    const handleGuestLogin = () => {
        handleLogin({
            username: "guest",
            password: "guest"
        });
    };

    return (
        <div className="login-container">
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
                        <button className='submit-login yellow' onClick={() => setshowRegister(true)}>Create an account</button>
                        <button type="button" className='submit-login yellow' onClick={handleGuestLogin}>Login as a guest</button>
                    </div>
                </form>
            </>
        </div>
    );
};

export default Login