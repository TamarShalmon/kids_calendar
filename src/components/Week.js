import React from 'react'
import Day from './Day'
import './Week.css'


function Week({ days }) {

    return (
        <div className='week'>
            {days.map(day =>
                <Day
                    key={day.id}
                    title={day.title}
                    style={day.style} />)}
        </div>
    )
}

export default Week