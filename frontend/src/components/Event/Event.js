import React, { useContext } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { BoardContext } from '../../context/BoardContext';
import "./Event.css";

function Event({ id, day, name, image, note, pic, type, index }) {
    const { sortEvents } = useContext(BoardContext)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: { id, day, name, image, score: 0, type: 'event', from: type, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "button",
        drop: (item) => {
            if (item.from === 'day') {
                console.log('drag:', item.index, item.image, 'drop', index, image);
                sortEvents(item.id, id, day)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const opacity = isDragging ? 0 : 1

    return (
        <button
            ref={drag} 
            className='event'
            style={{ opacity }}>
            <div ref={drop} className='div-dropable' >
                {note ? <p>{note}</p> : <img className='event-image' src={pic ? pic : image} />}
            </div>
        </button>
    )
}

export default Event

