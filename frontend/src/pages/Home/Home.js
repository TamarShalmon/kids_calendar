import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from "../../context/UserContext";

import User from '../../components/User/User';
import UserModal from '../../modals/UserModal/UserModal';
import axios from "axios";
import { useCookies } from "react-cookie";

import './Home.css';


function Home() {

    const [showRegister, setshowRegister] = useState(false);
    const { mainUser } = useContext(UserContext);

    return (

        <>
            <div className='container-home fill-home'>
                <h1 className='h1-home'>My week planner</h1>
                <div className='auth-container'>
                    {mainUser ? <Welcome /> :
                        showRegister ? <Register setshowRegister={setshowRegister} /> :
                            <Login setshowRegister={setshowRegister} />}

                </div>
            </div >
        </>
    )
}



const Login = ({ setshowRegister }) => {
    const { login } = useContext(UserContext);
    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });
            login(result.data)
            setCookies("access_token", result.data.token);
            localStorage.setItem("userID", result.data.userID);
            localStorage.setItem("mainUser", JSON.stringify(result.data));
        } catch (error) {
            alert("Username or password is incorrect.");
            console.error(error);
        }
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
                        <button type="button" className='submit-login yellow'>Login as a guest</button>
                    </div>
                </form>
            </>
        </div>
    );
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
            alert("Registration Completed! Now login.");
            setshowRegister(false);

        } catch (error) {
            console.error(error);
            alert("Username already exists or registration details are missing.!");
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

function Welcome() {

    const { modalOpen, modalOpenToggle, users, showDeleteIcons, deleteIconsToggle, deleteUser } = useContext(UserContext);
    const { logout } = useContext(UserContext);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users.length])


    const handleUserDelete = (userId) => {
        deleteUser(userId);
        deleteIconsToggle(false);
    }

    return (
        <>
            {modalOpen && <UserModal eventItem={modalOpen} />}

            <div className="login-container">
                <h3 className='h3-home'>This is my name:</h3>
                <div className='container-name'>
                    {users.map((user, index) =>
                        <div key={user.id} className='user-wrapper'>
                            <User
                                userId={user.id}
                                name={user.name}
                                onDelete={handleUserDelete}
                                showDeleteIcon={showDeleteIcons}
                            />
                            {showDeleteIcons && (
                                <div className='delete-icon-wrapper' onClick={() => handleUserDelete(user.id)}>
                                    <img src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' alt='Delete' />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='bnt-flex'>
                    <img src={`/images/add.png`} alt='pic-home' onClick={(userItem) => modalOpenToggle({ ...userItem })} />
                    <img src={`/images/recycle-bin.png`} alt='pic-home' onClick={() => deleteIconsToggle(!showDeleteIcons)} />
                    <img src={`/images/logout.png`} alt='pic-home' onClick={logout} />
                    {/* <img src={`/images/settings.png`} alt='pic-home' /> */}
                </div>
            </div>
        </>
    )
}

export default Home

