import React from 'react';
import Day from './Day';
import './Week.css';



function Week({ days }) {
    const currentDay = new Date().getDay() + 1;

    return (
        <div className="week">
            {days.map((day) => (
                <Day
                    key={day.id}
                    title={day.title}
                    style={day.style}
                    currentDay={currentDay === day.id}
                />
            ))}
        </div>
    );
}

export default Week;



