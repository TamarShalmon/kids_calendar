import { useEffect, useState, useContext } from 'react';
import { BoardContext } from "../context/BoardContext";
import { useDrop } from 'react-dnd';
import Event from './Event';
import "./Day.css";
import Weather from './Weather';
import CustomTaskModal from './CustomTaskModal';
import CustomPicModal from './CustomPicModal';


function Day({ name, eventsList, style, currentDay }) {

    const { addEvent, setModalOpen, setModalPicOpen } = useContext(BoardContext);

    const [weatherBoard, setWeatherBoard] = useState();
    // const [modalOpen, setModalOpen] = useState(false);
    // const [modalPicOpen, setModalPicOpen] = useState(false);


    ///// Local Storage--------------------
    useEffect(() => {
        if (localStorage.getItem(`${name}-events`)) {
            // eventsList([...JSON.parse(localStorage.getItem(`${name}-events`))])
        }
        if (localStorage.getItem(`${name}-weather`)) {
            setWeatherBoard(JSON.parse(localStorage.getItem(`${name}-weather`)))
        }
    }, []);

    useEffect(() => {
        if (eventsList.length) {
            localStorage.setItem(`${name}-events`, JSON.stringify(eventsList))
        } else {
            localStorage.removeItem(`${name}-events`)
        }
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
        console.log('Event ID', weatherItem)
        if (weatherItem.id && weatherItem.type === 'weather') {
            setWeatherBoard(weatherItem);
        }
    };
    /////----------------------------------

    ///// Drag and drop Event--------------
    // const handleSubmit = (eventItem) => {
    //     addImageToBoard(eventItem);
    //     setModalOpen(null)
    // };

    // const handlePicSubmit = (eventItem) => {
    //     console.log('event', eventItem)
    //     addImageToBoard(eventItem);
    //     setModalPicOpen(null)
    // };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "button",
        drop: (eventItem) => {
            if (eventItem.id === 2) {
                setModalOpen(eventItem)
            } else if (eventItem.id === 1) {
                setModalPicOpen(eventItem)
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
            {/* {modalOpen && <CustomTaskModal eventItem={modalOpen} setModalOpen={setModalOpen} onSubmit={handleSubmit} />}
            {modalPicOpen && <CustomPicModal eventItem={modalPicOpen} setModalPicOpen={setModalPicOpen} onSubmit={handlePicSubmit} />} */}


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

