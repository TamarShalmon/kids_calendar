import React from 'react'
import { useDrag } from "react-dnd";
import "./Event.css";

function Event({ id, title, image }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: { id, title, image, score: 0 },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    return (
        <button
            className='event'
            ref={drag}
            style={{ border: isDragging ? "5px solid pink" : "0px" }} >
            <h4>{title}</h4>
            <p>{image}</p>
        </button>
    )
}

export default Event