import { useEffect, useState, useContext } from 'react';
import { BoardContext } from "../context/BoardContext";
import { useDrop } from 'react-dnd';
import Event from './Event';
import "./Day.css";
import Weather from './Weather';
import CustomTaskModal from './CustomTaskModal';
import CustomPicModal from './CustomPicModal';


function Day({ name, eventsList, style, currentDay }) {

    const { addEvent, modalPicOpenToggle, modalOpenToggle } = useContext(BoardContext);

    const [weatherBoard, setWeatherBoard] = useState();


    ///// Local Storage--------------------
    useEffect(() => {
        if (localStorage.getItem(`${name}-weather`)) {
            setWeatherBoard(JSON.parse(localStorage.getItem(`${name}-weather`)))
        }
    }, []);

    useEffect(() => {
        if (weatherBoard) {
            localStorage.setItem(`${name}-weather`, JSON.stringify(weatherBoard))
        } else {
            localStorage.removeItem(`${name}-weather`)
        }
    }, [eventsList, weatherBoard]);
    /////----------------------------------

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
            setWeatherBoard(weatherItem);
        }
    };
    /////----------------------------------


    const [{ isOver }, drop] = useDrop(() => ({
        accept: "button",
        drop: (eventItem) => {
            if (eventItem.id === 2) {
                modalOpenToggle({ ...eventItem, day: name })
            } else if (eventItem.id === 1) {
                modalPicOpenToggle({ ...eventItem, day: name })
            } else {
                addImageToBoard(eventItem)
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (eventItem) => {
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
                    {weatherBoard && <Weather
                        key={weatherBoard.id}
                        image={weatherBoard.image} />}
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

