import React from 'react'
import { useState } from 'react';
import Event from './Event'
import './Events.css'
import Slider from "react-slick";
import EraseButtom from './EraseButtom'


function Events({ events, title }) {

    const [showEvents, setShowEvents] = useState(false);


    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 8,
        slidesToScroll: 1,
    };

    return (
        <>

            <div className={showEvents ? 'flex-events visible' : 'flex-events'}>
                <button
                    className='toggle-button'
                    onClick={() => setShowEvents(!showEvents)}>
                    {/* Toggle Events */}
                    <img src="https://cdn-icons-png.flaticon.com/512/3388/3388823.png" alt='Toggle Events'/>
                </button>

                <button >
                    <img src='https://cdn-icons-png.flaticon.com/512/69/69524.png' />
                </button>
                <div className='events'>
                    <Slider {...settings}  >
                        {events.map(event =>
                            <Event
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                image={event.image} />)}
                    </Slider>
                </div>
                <EraseButtom events={events}/>
                {/* <button>
                    <img src='https://cdn-icons-png.flaticon.com/512/3976/3976956.png'/>
                </button> */}
            </div>
        </>
    )
}

export default Events