import React from 'react';
import Day from './Day';
import './Week.css';
import currentDayBackground from './assets/733800.png';


const currentDayStyle = {
    background: `no-repeat center 33.5rem/6rem url(${currentDayBackground})`
};

function Week({ days }) {
    const currentDay = new Date().getDay() + 1;

    return (
        <div className="week">
            {days.map((day) => (
                <Day
                    key={day.id}
                    title={day.title}
                    style={currentDay === day.id ? { ...currentDayStyle, ...day.style } : day.style}
                />
            ))}
        </div>
    );
}

export default Week;



