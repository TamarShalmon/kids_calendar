import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "../../../../context/UserContext";

import "./Header.css";
import Weather from '../../../../components/Weather/Weather';

function Header({ weatherIcon, days }) {

    const { users } = useContext(UserContext);
    let userName = users.filter((user) => user.active)[0].name;

    const dayOfWeek = new Date().getDay();

    return (
        <>

            <div className='header'>

                <div className='hello'>
                    Hello <span style={{ fontFamily: 'Neucha, Rubik' }}>{userName}</span>,<br />
                    L'ets plan your week!
                </div>

                <div className='right-header'>
                    <div className='date'
                        style={days[dayOfWeek].style}>
                        {new Date().toLocaleString("en-US", { day: '2-digit' }) + " " + new Date().toLocaleString("en-US", { month: "long" }) + " " + new Date().getFullYear()}
                    </div>
                    <div className='weather'>
                        {weatherIcon.map(icon =>
                            <Weather
                                key={icon.id}
                                id={icon.id}
                                image={icon.image}
                                style={icon.style}
                            />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header