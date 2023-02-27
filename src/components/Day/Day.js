import { useEffect, useState, useContext, useCallback } from 'react';
import { BoardContext } from "../../context/BoardContext";
import update from 'immutability-helper'


import { useDrop } from 'react-dnd';
import Event from '../../components/Event/Event';
import "./Day.css";
import Weather from '../Weather/Weather';


function Day({ name, eventsList, weatherDay, style, currentDay, }) {

    const { addEvent, modalPicOpenToggle, modalOpenToggle, addWeather, setEventsOfDay } = useContext(BoardContext);

    ///// Drag and drop Weather------------
    const [{ isOverWeather }, dropWeather] = useDrop(() => ({
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
    /////----------------------------------


    ///// Drag and drop Event------------
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "button",
        drop: (eventItem) => {
            if (eventItem.type !== 'event' || eventItem.id > 99) return;
            if (eventItem.id === 2) {
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
    /////----------------------------------

    ///// Move Drag and drop Event---------
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setEventsOfDay(name, dragIndex, hoverIndex);
    }, [])
    /////----------------------------------



    return (
        <>
            <div className={`day ${currentDay ? "current-day-day" : ""}`} style={style}>

                <div className={`day-title ${currentDay ? "current-day-title" : ""}`}>
                    {name}</div>

                <div ref={dropWeather} className="day-weather">
                    {weatherDay && <Weather
                        id={weatherDay.id}
                        day={name}
                        key={weatherDay.id}
                        name={weatherDay.name}
                        image={weatherDay.image} />}
                </div>

                <div ref={drop} className="day-events">
                    {eventsList.map((event, index) =>
                        <Event
                            moveCard={moveCard}
                            index={index}
                            day={name}
                            id={event.id}
                            note={event.note}
                            pic={event.pic}
                            name={event.name}
                            image={event.image} />
                    )}
                </div>

            </div>
        </>
    )
}

export default Day

