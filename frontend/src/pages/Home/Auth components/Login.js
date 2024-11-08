import React, { useContext, useState } from 'react'
import { useCookies } from "react-cookie";
import { UserContext } from "../../../context/UserContext";
import { useTranslation } from 'react-i18next';
import '../Home.css';
import apiReq from '../../../global/apiReq';

const Login = ({ setshowRegister }) => {
    const { t } = useTranslation();

    const { login } = useContext(UserContext);
    const [loading, setLoading] = useState()
    const [, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin({ username, password });
    };

    const handleGuestLogin = () => {
        handleLogin()
    };

    const handleLogin = async (data) => {
        setLoading(true)
        try {
            const result = await apiReq({ url: data ? 'auth/login' : 'auth/connect-as-guest', data, method: "POST" });
            // console.log(result);
            login(result)
            setCookies("access_token", result.token);
            localStorage.setItem("userID", result.userID);
            localStorage.setItem("mainUser", JSON.stringify(result));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading()
        }
    };


    return (
        <>
            {loading && <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div>}

            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">{t('username')}</label>
                        <input
                            className='input-auth'
                            type="text"
                            id="username"
                            value={username}
                            dir="auto"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{t('password')}</label>
                        <input
                            className='input-auth'
                            type="password"
                            id="password"
                            value={password}
                            dir="auto"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className='btn-flex'>
                        <button className='submit-login login' type="submit">{t('login')}</button>
                        <button className='submit-login yellow' onClick={() => setshowRegister(true)}>{t('account')}</button>
                        <button type="button" className='submit-login yellow' onClick={handleGuestLogin}>{t('guest')}</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login