import React from 'react'
import { useDrag } from "react-dnd";
import "./Weather.css";

function Weather({ id, image }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: { id, image },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    return (
        <button
            className='weatherIcon'
            ref={drag}
            style={{ border: isDragging ? "2px solid black" : "0px" }} >
            <img className='weather-icon' src={image} />
        </button>
    )
}

export default Weather