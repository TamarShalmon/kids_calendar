import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../Home.css';


// const baseUrl = 'http://localhost:3001'
const baseUrl = 'https://kids-calender-server.onrender.com';

const Register = ({ setshowRegister }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { t } = useTranslation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${baseUrl}/auth/register`, {
                username,
                password,
            });
            toast.success(t('t-success'));
            setshowRegister(false);

        } catch (error) {
            console.error(error);
            toast.error(t('t-error'));
        }
    };

    return (
        <div className="register-container">
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
                    <button className="submit-register" type="submit">{t('register')}</button>
                    <button className="submit-register yellow" onClick={() => setshowRegister(false)} >{t('back')}</button>
                </div>
            </form>
        </div>
    );
};


export default Register