import { useState } from 'react'
import "./Day.css";

function Day({ title, description }) {

    const [event, setEvent] = useState("what now? click here");

    let selectedEvent = "hello"


    return (

        <div className='day'>
            <h3>{title}</h3>
            <p>put your events here</p>
            <button
                className='event'
                onClick={() => setEvent(selectedEvent)}>
                {event}
            </button>
            <button
                className='event'>
                what now? click here
            </button>
            <button
                className='event'>
                what now? click here
            </button>
            <button
                className='event'>
                what now? click here
            </button>
            <button
                className='event'>
                what now? click here
            </button>
            <button
                className='event'>
                what now? click here
            </button>

        </div>
    )
}

export default Day

