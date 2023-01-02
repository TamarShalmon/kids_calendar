import React from 'react';
import Day from './Day';
import './Week.css';
// import currentDayBackground from 'public/733800.png';

const currentDayStyle = {
    background: `black no-repeat center bottom/3rem url(https://cdn-icons-png.flaticon.com/512/733/733800.png)`,
    //background: `no-repeat center bottom/3rem url(${currentDayBackground})`
};

function Week({ days }) {
    const currentDay = new Date().getDay();

    return (
        <div className="week">
            {days.map((day) => (
                <Day
                    key={day.id}
                    title={day.title}
                    style={
                        currentDay === day.id ? { ...currentDayStyle } : day.style
                    }
                />
            ))}
        </div>
    );
}

export default Week;
