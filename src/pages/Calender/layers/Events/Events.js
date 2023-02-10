import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Event from '../../../../components/Event/Event'
import './Events.css'
import Slider from "react-slick";
import EraseButtom from '../../../../components/EraseButtom/EraseButtom'


function Events({ events, title}) {


    const [showEvents, setShowEvents] = useState(false);

    let navigate = useNavigate();

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
                    <img src="https://cdn-icons-png.flaticon.com/512/3388/3388823.png" alt='Toggle Events' />
                </button>

                <button onClick={()=> {navigate("/")}}>
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
                <EraseButtom/>
            </div>
        </>
    )
}

export default Events