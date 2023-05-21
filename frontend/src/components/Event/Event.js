import React, { useContext } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { BoardContext } from '../../context/BoardContext';
import "./Event.css";

function Event({ id, day, name, image, note, pic, from, index }) {
    const { sortEvents } = useContext(BoardContext)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: { id, day, name, image, type: 'event', from, index, note, pic },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [{ isOver }, drop] = useDrop({
        accept: "button",
        drop: (item) => {
            if (item.from && item.from === day) {
                // console.log('drag:', item.index, item.image, 'drop', index, image);
                sortEvents(item.id, id, day)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const opacity = isOver ? 0.5 : 1 && isDragging ? 0 : 1

    return (
        <button
            ref={drag}
            className='event'
            style={{ opacity }}>
            <div ref={drop} className='div-dropable' >
                {note ? <p>{note}</p> : <img className='event-image' src={pic ? pic : image} alt='event' />}
            </div>
        </button>
    )
}

export default Event

