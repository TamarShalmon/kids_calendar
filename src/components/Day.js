import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import Event from './Event';
import "./Day.css";
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import Weather from './Weather';

function Day({ title, style, id, image }) {

    const [board, setBoard] = useState([]);
    const [weatherBoard, setWeatherBoard] = useState([]);

///// Local Storage--------------------
    useEffect(() => {
        if (localStorage.getItem(title)) {
            setBoard([...JSON.parse(localStorage.getItem(title))])
        }
    }, [])

    useEffect(() => {
        if (board.length) {
            localStorage.setItem(title, JSON.stringify(board))
        } else {
            localStorage.removeItem(title)
        }
        console.log('board', board)
    }, [board])
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
        if (eventItem.id) {
            const existEvent = board.filter(item => item.id === eventItem.id);
            if (existEvent.length === 0) {
                setBoard((board) => [...board, eventItem]);
            }
        }
    };
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
    if (weatherItem.id) {
        const existEvent = weatherBoard.filter(item => item.id === weatherItem.id);
        if (existEvent.length === 0) {
            setWeatherBoard((weatherBoard) => [...weatherBoard, weatherItem]);
        }
    }
};
/////----------------------------------

    return (
        <>
            <div className='day' style={style}>
                <div className='day-title'>{title}</div>

                <div ref={drop} className="day-weather">
                    {weatherBoard.map(weather => <Weather
                        key={weather.id}
                        image={weather.image} />
                    )}
                </div>

                <div ref={drop} className="day-events">
                    {board.map(event => <Event
                        key={event.id}
                        title={event.title}
                        image={event.image} />
                    )}
                </div>
            </div>
        </>
    )
}

export default Day

