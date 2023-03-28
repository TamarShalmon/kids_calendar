import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import User from '../../../components/User/User';
import UserModal from '../../../modals/UserModal/UserModal';
import { useCookies } from "react-cookie";
import Login from './Login';

import '../Home.css';

function Welcome() {


    const { modalOpen, modalOpenToggle, users, showDeleteIcons, deleteIconsToggle, deleteUser } = useContext(UserContext);

    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/");

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
                    </div>
                </>
            )}
        </>
    )
}

export default Welcome