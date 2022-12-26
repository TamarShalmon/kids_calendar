import React from 'react'
import "./Header.css";
import Weather from './Weather';

function Header({ weatherIcon }) {
    return (
        <>
            <div className='header'>

                <div className='hello'>
                    Hello user,<br />
                    L'ets plan your week!
                </div>

                <div className='right-header'>
                    <div className='clock'>
                        {new Date().toLocaleString("en-US", { day: '2-digit' }) + " " + new Date().toLocaleString("en-US", { month: "long" }) + " " + new Date().getFullYear()}
                    </div>
                    <div className='weather'>
                        {weatherIcon.map(icon =>
                            //Weather //weatherIcon
                            <img
                                className='weatherIcon'
                                key={icon.id}
                                id={icon.id}
                                // image //src
                                src={icon.image}
                                style={icon.style}
                            />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header