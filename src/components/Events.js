import React from 'react'
import Event from './Event'
import './Events.css'


function Events({ events }) {

    return (
        <div className='events'>
            {events.map(event =>
                <Event
                    key={event.id}
                    title={event.title}
                    image={event.image} />)}
        </div>
    )
}

export default Events