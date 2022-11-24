import React from 'react'
import "./Day.css";

function Day({ title, description }) {
    return (
        <div className='day'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default Day