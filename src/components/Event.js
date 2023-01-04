import { useState } from 'react'
import { useDrag } from "react-dnd";
import "./Event.css";

function Event({ id, title, image, note }) {


    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: { id, title, image, score: 0, type: 'event' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (

        <button
            className='event'
            ref={drag}
        // style={{ border: isDragging ? "1px solid white" : "0px" }}
        >
            {note ? <p>{note}</p> :  <img className='event-image' src={image} />}
        </button>

    )
}

export default Event