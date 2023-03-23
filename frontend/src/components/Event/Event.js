import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from "react-dnd";
import "./Event.css";

function Event({ id, day, name, image, note, pic, moveCard, index }) {

    const ref = useRef(null)

    const [{ handlerId }, drop] = useDrop({
        accept: "button",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current || item.id < 100) {
                return;
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            // const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverBoundingRect = ref.current ? ref.current.getBoundingClientRect() : null;

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },

    })
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: () => {
            return { id, day, name, image, type: 'event', index }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),


    }));
    const opacity = isDragging ? 0 : 1

    drag(drop(ref))

    return (

        <button
            className='event'
            ref={ref}
            data-handler-id={handlerId}>
            {note ? <p>{note}</p> : <img className='event-image' src={pic ? pic : image} />}
        </button>

    )
}

export default Event