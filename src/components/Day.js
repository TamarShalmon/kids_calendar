import update from 'immutability-helper'
import { useEffect, useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Event from './Event';
import "./Day.css";
import Weather from './Weather';


function Day({ title, style, id, image }) {

    const [board, setBoard] = useState([]);
    const [weatherBoard, setWeatherBoard] = useState();

    ///// Local Storage--------------------
    useEffect(() => {
        if (localStorage.getItem(`${title}-events`)) {
            setBoard([...JSON.parse(localStorage.getItem(`${title}-events`))])
        }
        if (localStorage.getItem(`${title}-weather`)) {
            setWeatherBoard(JSON.parse(localStorage.getItem(`${title}-weather`)))
        }
    }, [])

    useEffect(() => {
        if (board.length) {
            localStorage.setItem(`${title}-events`, JSON.stringify(board))
        } else {
            localStorage.removeItem(`${title}-events`)
        }
        if (weatherBoard) {
            localStorage.setItem(`${title}-weather`, JSON.stringify(weatherBoard))
        } else {
            localStorage.removeItem(`${title}-weather`)
        }
        console.log('board', board)
        console.log('weatherBoard', weatherBoard)
    }, [board, weatherBoard])
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
        console.log('Event ID', weatherItem)
        if (weatherItem.id && weatherItem.type === 'weather') {
            setWeatherBoard(weatherItem);
        }
    };
    /////----------------------------------

    ///// Drag and drop Event--------------
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "button",
        drop: (eventItem) => addImageToBoard(eventItem),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (eventItem) => {
        console.log('Event ID', eventItem)
        if (eventItem.id && eventItem.type === 'event') {
            const existEvent = board.filter(item => item.id === eventItem.id);
            if (existEvent.length === 0 && board.length < 6) {
                setBoard((board) => [...board, eventItem]);

            }
        }
    };
    /////----------------------------------


    return (
        <>
            <div className='day' style={style}>
                <div className='day-title'>{title}</div>

                <div ref={dropWeather} className="day-weather">
                    {weatherBoard && <Weather
                        key={weatherBoard.id}
                        image={weatherBoard.image} />}
                </div>

                <div ref={drop} className="day-events">

                    {board.slice(0, 5).map((event, index) =>
                        <Event
                            key={event.id}
                            index={index}
                            title={event.title}
                            image={event.image} />
                    )}
                </div>
            </div>
        </>
    )
}

export default Day

