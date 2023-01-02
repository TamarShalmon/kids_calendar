import { style } from '@mui/system';
import React from 'react'
import { useDrag } from "react-dnd";
import "./Weather.css";

function Weather({ id, image, style }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: { id, image, type: 'weather' },
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
            src={image} />
        </button>
    )
}

export default Weather 