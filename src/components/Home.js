import { useState } from 'react'
import './Home.css';
import User from './User';
import UserModal from './UserModal';

function Home() {

    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([]);


    const handleSubmit = (nameItem) => {
        addNameToUsers(nameItem);
        setModalOpen(null)
    };

    const addNameToUsers = (nameItem) => {

        if (nameItem) {
            setUsers((users) => [...users, nameItem]);
        }
    };

    return (
        <>
            {modalOpen && <UserModal setModalOpen={setModalOpen} onSubmit={handleSubmit} />}


            <div className='container-home fill-home'>

                <div className='pics-flex'>
                    <img src="/kids1.png" />
                    <img src="/kids2.png" />
                    <img src="/kids3.png" />
                    <p>For kids!</p>
                </div>
                <h1 className='h1-home'>My week planner</h1>
                <h3 className='h3-home'>This is my name:</h3>
                <div className='container-name'>
                    {users.map((name, index) =>
                        <User
                            key={name.id}
                            index={index}
                            note={name.note}
                        />
                    )}
                </div>
                <div className='bnt-flex'>
                    <img src="/add.png" alt='pic-home' onClick={() => setModalOpen(true)} />
                    <img src="/recycle-bin.png" alt='pic-home' />
                    <img src="/settings.png" alt='pic-home' />
                </div>

            </div >
        </>
    )
}

export default Home