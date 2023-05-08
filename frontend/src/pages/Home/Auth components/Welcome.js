import React, { useContext } from 'react'
import { UserContext } from "../../../context/UserContext";

import User from '../../../components/User/User';
import UserModal from '../../../modals/UserModal/UserModal';
import '../Home.css';

function Welcome() {

    const { modalOpen, modalOpenToggle, users, showDeleteIcons, deleteIconsToggle, deleteUser } = useContext(UserContext);
    const { logout } = useContext(UserContext);

    const handleUserDelete = (userId) => {
        deleteUser(userId);
        deleteIconsToggle(false);
    }

    return (
        <>
            {modalOpen && <UserModal eventItem={modalOpen} />}

            <div className="login-container">
                <h3 className='h3-home'>This is my name:</h3>
                <div className='container-name' onClick={(userItem) => modalOpenToggle({ ...userItem })}>
                    {users.map((user, index) =>
                        <div key={user._id} className='user-wrapper'>
                            <User
                                userId={user._id}
                                name={user.name}
                                onDelete={handleUserDelete}
                                showDeleteIcon={showDeleteIcons}
                            />
                            {showDeleteIcons && (
                                <div className='delete-icon-wrapper'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUserDelete(user._id);
                                    }}>
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

export default Welcome