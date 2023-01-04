import React from 'react'
import Event from './Event'
import './Events.css'
import Slider from "react-slick";



function Events({ events, title }) {




    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        //slidesToShow: 7,
        slidesToShow: window.innerWidth >= 1400 ? 9 : 7,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className='flex-events'>
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
                <button>
                    <img src='https://cdn-icons-png.flaticon.com/512/3976/3976956.png' />
                </button>
            </div>
        </>
    )
}

export default Events