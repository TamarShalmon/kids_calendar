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
            style={{ border: isDragging ? "2px solid black" : "0px" }} >
            <img className='event-image' src={image}/>
        </button>
    )
}

export default Event