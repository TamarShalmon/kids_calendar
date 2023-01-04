import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import Event from './Event';
import "./Day.css";
import Weather from './Weather';
import CustomTaskModal from './CustomTaskModal';


function Day({ title, style, id, image, }) {

    const [board, setBoard] = useState([]);
    const [weatherBoard, setWeatherBoard] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [inputTask, setInputTask] = useState("");


    ///// Local Storage--------------------
    useEffect(() => {
        if (localStorage.getItem(`${title}-events`)) {
            setBoard([...JSON.parse(localStorage.getItem(`${title}-events`))])
        }
        if (localStorage.getItem(`${title}-weather`)) {
            setWeatherBoard(JSON.parse(localStorage.getItem(`${title}-weather`)))
        }
        if (localStorage.getItem(`${title}-inputTask`)) {
            setInputTask(localStorage.getItem(`${title}-inputTask`));
        }
    }, []);

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
        if (inputTask) {
            localStorage.setItem(`${title}-inputTask`, inputTask);
        } else {
            localStorage.removeItem(`${title}-inputTask`);
        }
        console.log('board', board)
        console.log('weatherBoard', weatherBoard)
        console.log('weatherBoard', weatherBoard)
    }, [board, weatherBoard, inputTask]);
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
    const handleSubmit = (task) => {
        setInputTask(task);
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "button",
        drop: (eventItem) => {
            addImageToBoard(eventItem);
            if (eventItem.id === 2) {
                setModalOpen(true)
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (eventItem) => {
        console.log('Event ID', eventItem)
        if (eventItem.id && eventItem.type === 'event') {
            const existEvent = board.filter(item => item.id === eventItem.id);
            if (existEvent.length === 0 ) {
                setBoard((board) => [...board, eventItem]);

            }
        }
    };
    /////----------------------------------


    return (
        <>
            {modalOpen && <CustomTaskModal setOpenModal={setModalOpen} onSubmit={handleSubmit} />}
            <div className='day' style={style}>
                <div className='day-title'>{title}</div>

                <div ref={dropWeather} className="day-weather">
                    {weatherBoard && <Weather
                        key={weatherBoard.id}
                        image={weatherBoard.image} />}
                </div>

                <div ref={drop} className="day-events">

                    {board.slice(0, 6).map((event, index) =>
                        <Event
                            key={event.id}
                            index={index}
                            note={inputTask}
                            title={event.title}
                            image={event.image} />
                    )}
                </div>
            </div>
        </>
    )
}

export default Day

