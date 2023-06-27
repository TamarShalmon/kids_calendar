import React, { useEffect, useContext, useCallback } from 'react';
import { BoardContext } from "../../context/BoardContext";
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';

import Event from '../../components/Event/Event';
import "./Day.css";
import Weather from '../Weather/Weather';

import Cookies from 'js-cookie';


function Day({ name, eventsList, weatherDay, style, currentDay, }) {

    const { t } = useTranslation();
    const currentLanguageCode = Cookies.get('i18next') || 'en'

    const { addEvent, modalPicOpenToggle, modalOpenToggle, addWeather, sortEvents, duplicateEvent } = useContext(BoardContext);

    // useEffect(() => {
    //     console.log('Day has been updated', eventsList)
    // }, [eventsList])

    ///// Drag and drop Weather------------
    const [, dropWeather] = useDrop(() => ({
        accept: "button",
        drop: (weatherItem) => addWeatherToBoard(weatherItem),
        collect: (monitor) => ({
            isOverWeather: !!monitor.isOver(),
        }),
    }));

    const addWeatherToBoard = (weatherItem) => {
        if (weatherItem.id && weatherItem.type === 'weather') {
            addWeather(name, weatherItem);
        }
    };

    ///// Drag and drop Event------------
    const [, drop] = useDrop(() => ({
        accept: "button",
        drop: (eventItem) => {
            if (eventItem.type !== 'event' || eventItem.from === name) return;
            if (eventItem.from) {
                duplicateEvent(name, eventItem.image, eventItem.note, eventItem.pic)
            } else if (eventItem.id === 2) {
                modalOpenToggle({ ...eventItem, day: name })
            } else if (eventItem.id === 1) {
                modalPicOpenToggle({ ...eventItem, day: name })
            } else {
                addEventImageToBoard(eventItem)
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addEventImageToBoard = (eventItem) => {
        if (eventItem.id && eventItem.type === 'event') {
            addEvent(name, eventItem);
        }
    };

    ///// Move Drag and drop Event---------
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        sortEvents(dragIndex, hoverIndex, name);
    }, [])


    return (
        <>
            <div className={`day print-day ${currentDay ? "current-day-day" : ""}`} style={currentDay ? {
                ...style,
                backgroundImage: `url(${currentLanguageCode === 'he' ? "/images/sunflower-today-he.gif" : "/images/sunflower-today.gif"})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center bottom',
                backgroundSize: '6.5rem'
            } : style}>

                <div className={`day-title print-day-title ${currentDay ? "current-day-title" : ""}`}>
                    {t(name)}
                </div>

                <div ref={dropWeather} className={`day-weather print-weather ${currentDay ? "day-current-weather" : ""}`}>
                    {weatherDay && <Weather
                        id={weatherDay.id}
                        day={name}
                        key={weatherDay.id}
                        name={weatherDay.name}
                        image={weatherDay.image} />}
                </div>

                <div ref={drop} className={`day-events ${currentDay ? "current-day-events" : ""}`}>
                    {eventsList.map((event, index) =>
                        <Event
                            key={`${event.id}`}
                            moveCard={moveCard}
                            index={index}
                            day={name}
                            id={event.id}
                            note={event.note}
                            from={name}
                            pic={event.pic}
                            name={event.name}
                            image={event.image}
                            title={event.title} />
                    )}
                </div>

            </div>
        </>
    )
}

export default Day

