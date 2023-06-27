import React, { useContext, useState } from 'react'
import { UserContext } from "../../context/UserContext";
import { useTranslation } from 'react-i18next';


import './Home.css';
import Welcome from './Auth components/Welcome';
import Register from './Auth components/Register';
import Login from './Auth components/Login';


function Home() {

    const [showRegister, setshowRegister] = useState(false);
    const { mainUser } = useContext(UserContext);
    const { t } = useTranslation();


    return (

        <>
            <div className='container-home fill-home'>
                <h1 className='h1-home'>{t('h1-home')}</h1>
                <div className='auth-container'>
                    {mainUser ? <Welcome /> :
                        showRegister ? <Register setshowRegister={setshowRegister} /> :
                            <Login setshowRegister={setshowRegister} />}

                </div>
            </div >
        </>
    )
}


export default Home
