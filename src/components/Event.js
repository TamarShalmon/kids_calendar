import { useState } from 'react'
import { useDrag, useDrop } from "react-dnd";
import Custom from './Custom';
import "./Event.css";

function Event({ id, title, image, }) {

    const [modalOpen, setModalOpen] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "button",
        item: { id, title, image, score: 0, type: 'event' },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item.id === 1 && dropResult) {
                setModalOpen(true)
                { modalOpen && <Custom setOpenModal={setModalOpen} /> }
                //alert(`You dropped ${item.title}!`)
            }
        },
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
            <img className='event-image' src={image} />
        </button>

    )
}

export default Event