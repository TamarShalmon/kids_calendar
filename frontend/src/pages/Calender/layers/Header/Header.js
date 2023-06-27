import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { UserContext } from "../../../../context/UserContext";
import Weather from '../../../../components/Weather/Weather';

import "./Header.css";


function Header({ weatherIcon, days }) {
    const { t } = useTranslation();

    const { users } = useContext(UserContext);
    let userName = users.filter((user) => user.active)[0].name;

    const dayOfWeek = new Date().getDay();
    const month = new Date().toLocaleString("en-US", { month: "long" });


    return (
        <>

            <div className='header'>

                <div className='hello no-print'>
                    {t('hello1')}<span>{t('hello2', { userName })}</span>,<br />
                    {t('hello3')}
                </div>

                <div className="print-hello">
                {t('hello2', { userName })} {t('hello-print')}
                </div>

                <div className='right-header'>
                    <div className='date'
                        style={days[dayOfWeek].style}>
                        {new Date().toLocaleString("en-US", { day: '2-digit' }) + " " + t('months.' + month) + " " + new Date().getFullYear()}
                    </div>
                    <div className='weather no-print' dir='ltr'>
                        {weatherIcon.map(icon =>
                            <Weather
                                key={icon.id}
                                id={icon.id}
                                image={icon.image}
                                style={icon.style}
                            />)}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Header