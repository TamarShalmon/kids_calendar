import React from 'react';
import Day from './Day';
import './Week.css';
import currentDayBackground from './assets/733800.png';
import { style } from '@mui/system';

const currentDayStyle = {

    background: `no-repeat center bottom/3rem url(${currentDayBackground})`
};

function Week({ days }) {
    const currentDay = new Date().getDay()+1;

    return (
        <div className="week">
            {days.map((day) => (
                <Day
                    key={day.id}
                    title={day.title}
                    style={
                        currentDay === day.id ? { ...currentDayStyle, ...day.style } : day.style
                    }
                />
            ))}
        </div>
    );
}

export default Week;


// import React from 'react'
// import Day from './Day'
// import './Week.css'


// function Week({ days }) {

//     function getDayStyle(dayId, dayStyle) {
//         const toDay = new Date();
//         const dayOfWeek = toDay.getDay();

//         if (dayOfWeek === dayId) {
//             return dayStyle , { background: "no-repeat center bottom/3rem url(public/733800.png)"};
//         } else {
//             return dayStyle;
//         }
//     }

//     return (
//         <div className='week'>
//             {days.map(day =>
//                 <Day
//                     key={day.id}
//                     title={day.title}
//                     style={getDayStyle(day.id, day.style)} />)

//             }
//         </div>
//     )
// }

// export default Week
