import { useEffect, useState, useContext } from 'react';
import { BoardContext } from "../../context/BoardContext";

import { useDrop } from 'react-dnd';
import Event from '../../components/Event/Event';
import "./Day.css";
import Weather from '../Weather/Weather';


function Day({ name, eventsList, weatherDay, style, currentDay , setWeek}) {

    const { addEvent, modalPicOpenToggle, modalOpenToggle, addWeather } = useContext(BoardContext);

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

