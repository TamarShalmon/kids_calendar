import React from 'react'
import "./Event.css";

function Event({ title, image }) {
    return (
        <div className='event'>
            <h4>{title}</h4>
            <p>{image}</p>
        </div>
    )
}

export default Event