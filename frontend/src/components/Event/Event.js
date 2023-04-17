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
                console.log('drag:', item.index, 'drop', index);
                sortEvents(item.index, index, day)
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
            <div ref={drop} >
                {note ? <p>{note}</p> : <img className='event-image' src={pic ? pic : image} />}
            </div>
        </button>
    )
}

export default Event


// import React from 'react';
// import { useRef } from 'react'
// import { useDrag, useDrop } from "react-dnd";
// import "./Event.css";

// function Event({ id, day, name, image, note, pic, moveCard, index }) {

//     const ref = useRef(null)
//     const [{ handlerId }, drop] = useDrop({
//         accept: "button",
//         collect(monitor) {
//             return {
//                 handlerId: monitor.getHandlerId(),
//                 isOver: !!monitor.isOver(),
//             }
//         },
//         hover(item, monitor) {
//             if (!ref.current) {
//                 return
//             }
//             const dragIndex = item.index
//             const hoverIndex = index
//             // console.log( item.id , id);
//             // Don't replace items with themselves
//             if (dragIndex === hoverIndex) {
//                 return
//             }
//             // Determine rectangle on screen
//             const hoverBoundingRect = ref.current?.getBoundingClientRect()
//             // Get vertical middle
//             const hoverMiddleY =
//                 (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//             // Determine mouse position
//             const clientOffset = monitor.getClientOffset()
//             // Get pixels to the top
//             const hoverClientY = clientOffset.y - hoverBoundingRect.top
//             // Only perform the move when the mouse has crossed half of the items height
//             // When dragging downwards, only move when the cursor is below 50%
//             // When dragging upwards, only move when the cursor is above 50%
//             // Dragging downwards
//             if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//                 return
//             }
//             // Dragging upwards
//             if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//                 return
//             }
//             // Time to actually perform the action
//             moveCard(dragIndex, hoverIndex)

//             // Note: we're mutating the monitor item here!
//             // Generally it's better to avoid mutations,
//             // but it's good here for the sake of performance
//             // to avoid expensive index searches.
//             item.index = hoverIndex
//         },
//     })

//     const [{ isDragging }, drag] = useDrag(() => ({
//         type: "button",
//         item: () => {
//             return { id, day, name, image, type: 'event', index: index }
//         },
//         collect: (monitor) => ({
//             isDragging: !!monitor.isDragging(),
//         }),
//     }));

//     drag(drop(ref))

//     const opacity = isDragging ? 0 : 1

//     return (
//         <button
//             ref={ref}
//             className='event'
//             style={{ opacity }}
//             data-handler-id={handlerId}>

//             {note ? <p>{note}</p> : <img className='event-image' src={pic ? pic : image} />}
//         </button>
//     )
// }

// export default Event