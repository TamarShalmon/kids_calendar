import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import Event from './Event';
import "./Day.css";
import { eventWrapper } from '@testing-library/user-event/dist/utils';

function Day({ title, description, id }) {

    const [board, setBoard] = useState([]);

    useEffect(()=> {
        if (localStorage.getItem(title)) {
            setBoard([...JSON.parse(localStorage.getItem(title))])
        }
    },[])


    useEffect(()=> {
        if(board.length) {
            localStorage.setItem(title, JSON.stringify(board))
        } else {
            localStorage.removeItem(title)
        }
        console.log('board', board)
    },[board])


    const [{ isOver }, drop] = useDrop(() => ({
        accept: "button",
        drop: (eventItem) => addImageToBoard(eventItem),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (eventItem) => {
        console.log('Event ID', eventItem)
        if (eventItem.id) {
            const existEvent = board.filter(item => item.id === eventItem.id);
            if (existEvent.length === 0) {
                setBoard((board) => [...board, eventItem]);
            }
            
        } 
        
    };


    return (
        <>
            <div className='day'>
                <h3>{title}</h3>
                <div ref={drop} className="day-events">
                    {board.map(event => <Event
                        key={event.id}
                        title={event.title}/>
                    )}
                
                </div>
            </div>
        </>
    )
}

export default Day

