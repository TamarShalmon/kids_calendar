import { useEffect, useContext } from 'react'
import { UserContext } from "../../context/UserContext";

import './Home.css';
import User from '../../components/User/User';
import UserModal from '../../modals/UserModal/UserModal';

function Home() {

    const { modalOpen, modalOpenToggle, users } = useContext(UserContext);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users])

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
                        <User
                            key={user.id}
                            id={user.id}
                            name={user.name}
                        />
                    )}
                </div>
                <div className='bnt-flex'>
                    <img src="/add.png" alt='pic-home' onClick={(userItem) => modalOpenToggle({ ...userItem })} />
                    <img src="/recycle-bin.png" alt='pic-home' />
                    <img src="/settings.png" alt='pic-home' />
                </div>

            </div >
        </>
    )
}

export default Home