import React, { useContext, useState } from 'react';
import { BoardContext } from "../../../../context/BoardContext";
import { useNavigate } from 'react-router-dom';

import Event from '../../../../components/Event/Event'
import './Events.css'
import Slider from "react-slick";
import EraseButtom from '../../../../components/EraseButtom/EraseButtom'

import Cookies from 'js-cookie';


function Events({ events, title }) {
    const currentLanguageCode = Cookies.get('i18next') || 'en'

    const { eventsMenuOpenToggle } = useContext(BoardContext);

    const [showEvents, setShowEvents] = useState(false);

    const navigate = useNavigate();

    const welcome = () => {
        navigate("/")
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: currentLanguageCode === 'en' ? 0 : -1 ,
        rtl: currentLanguageCode === 'en' ? false : true,
    };

    return (
        <>

            <div className={showEvents ? 'flex-events visible' : 'flex-events'} dir='ltr'>

                <button
                    className='toggle-button no-print'
                    onClick={() => {
                        setShowEvents(!showEvents)
                        eventsMenuOpenToggle(!showEvents)
                    }}>
                    <img src={showEvents ? 'https://cdn-icons-png.flaticon.com/512/3416/3416079.png' : 'https://cdn-icons-png.flaticon.com/512/3388/3388823.png'}
                        alt='Toggle Events' />
                </button>

                {!showEvents ?
                    <button
                        className='print-toggle-button no-print '
                        onClick={() => {
                            window.print()
                        }}>
                        <img
                            // src={`images/printing.png`}
                            src={"https://cdn-icons-png.flaticon.com/512/3022/3022251.png"}
                            alt='Toggle print' />
                    </button> :
                    null}

                <button onClick={welcome}>
                    <img src='https://cdn-icons-png.flaticon.com/512/69/69524.png'
                        alt='home btn' />
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

                <EraseButtom />
                
            </div>
        </>
    )
}

export default Events