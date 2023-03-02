import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from "../../context/UserContext";

import './Home.css';
import User from '../../components/User/User';
import UserModal from '../../modals/UserModal/UserModal';

function Home() {

    const { modalOpen, modalOpenToggle, users, showDeleteIcons, deleteIconsToggle, deleteUser } = useContext(UserContext);

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


            <div className='container-home fill-home'>

                <div className='pics-flex'>
                    <img src={`/images/kids1.png`} />
                    <img src={`/images/kids2.png`} />
                    <img src={`/images/kids3.png`} />
                    <p>For kids!</p>
                </div>
                <h1 className='h1-home'>My week planner</h1>
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
                    <img src={`/images/settings.png`} alt='pic-home' />
                </div>

            </div >
        </>
    )
}

export default Home