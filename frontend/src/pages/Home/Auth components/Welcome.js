import React, { useContext } from 'react'
import { UserContext } from "../../../context/UserContext";
import { useTranslation } from 'react-i18next';


import User from '../../../components/User/User';
import UserModal from '../../../modals/UserModal/UserModal';
import '../Home.css';

function Welcome() {

    const { modalOpen, modalOpenToggle, users, showDeleteIcons, deleteIconsToggle, deleteUser } = useContext(UserContext);
    const { logout } = useContext(UserContext);
    const { t } = useTranslation();


    const handleUserDelete = (userId) => {
        deleteUser(userId);
        deleteIconsToggle(false);
    }

    return (
        <>
            {modalOpen && <UserModal eventItem={modalOpen} />}

            <div className="login-container">
                <h3 className='h3-home'>{t('h3-home')}</h3>
                <div className={users.length < 5 ? 'container-name' : 'container-name container-name--wide'} onClick={(userItem) => modalOpenToggle({ ...userItem })}>
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
                <div className='bnt-flex' dir='ltr'>
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