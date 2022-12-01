import React from 'react'
import "./Event.css";

function Event({ title, image }) {
    return (
        <button className='event'>
            <h4>{title}</h4>
            <p>{image}</p>
        </button>
    )
}

export default Event