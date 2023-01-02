import React from 'react'
import "./Header.css";
import Weather from './Weather';

function Header({ weatherIcon, days }) {

    function getDateStyle(dayId, dayStyle) {
        const toDay = new Date();
        const dayOfWeek = toDay.getDay();

        if (dayOfWeek === dayId) {
            return { backgroundColor: dayStyle };
        }
    }

    return (
        <>
            <div className='header'>

                <div className='hello'>
                    Hello user,<br />
                    L'ets plan your week!
                </div>

                <div className='right-header'>
                    <div className='date'
                        style={getDateStyle(days.id, days.style)}>
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