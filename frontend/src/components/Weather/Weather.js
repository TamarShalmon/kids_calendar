import React from 'react'
import { useDrag } from "react-dnd";
import "./Weather.css";

function Weather({ day, id, image, style }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: { day, id, image, type: 'weather' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    return (
        <button
            className='weatherIcon-btn'
            style={style}
            ref={drag}>
            <img 
            className='weatherIcon' 
            src={image} 
            alt='weatherIcon'/>
        </button>
    )
}

export default Weather 