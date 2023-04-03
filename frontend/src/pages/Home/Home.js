import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from "../../context/UserContext";
import User from '../../components/User/User';
import UserModal from '../../modals/UserModal/UserModal';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import './Home.css';



function Home() {


    return (

        <>
            <div className='container-home fill-home'>
                <h1 className='h1-home'>My week planner</h1>
                <div className='auth-container'>
                    <Login />
                </div>
            </div >
        </>
    )
}




const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);

    const [showWelcome, setshowWelcome] = useState(false);
    const [showRegister, setshowRegister] = useState(false);


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
            setshowWelcome(true)
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
                ))}
        </div>
    );
};

const Register = () => {
    const [showLogin, setShowLogin] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration Completed! Now login.");
            setShowLogin(true);

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
                        <button className="submit-register yellow" onClick={() => setShowLogin(true)} >Back</button>
                    </div>
                </form>
            )}
        </div>
    );
};

function Welcome() {


    const { modalOpen, modalOpenToggle, users, showDeleteIcons, deleteIconsToggle, deleteUser } = useContext(UserContext);

    const [cookies, setCookies] = useCookies(["access_token"]);


    const logout = () => {
        setCookies("access_token", "");
        localStorage.clear();
    };



    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users])


    const handleUserDelete = (userId) => {
        deleteUser(userId);
        deleteIconsToggle(false);
    }

    return (
        <>

            {modalOpen && <UserModal eventItem={modalOpen} />}

            {!cookies.access_token ? (<Login />) : (
                <>
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
                </>
            )}
        </>
    )
}


export default Home



// import Login from './Auth components/Login';
// import './Home.css';



// function Home() {


//     return (

//         <>
//             <div className='container-home fill-home'>
//                 <h1 className='h1-home'>My week planner</h1>
//                 <div className='auth-container'>
//                     <Login />
//                 </div>
//             </div >
//         </>
//     )
// }






// export default Home