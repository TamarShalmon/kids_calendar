import { useEffect, useState, useContext } from 'react';
import { useDrop } from 'react-dnd';
import Event from './Event';
import "./Day.css";
import Weather from './Weather';
import CustomTaskModal from './CustomTaskModal';
import CustomPicModal from './CustomPicModal';
import EraseModal from './EraseModal';
import { ModalEraseContext } from './App'


function Day({ title, style, currentDay }) {

    const [board, setBoard] = useState([]);
    const [weatherBoard, setWeatherBoard] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPicOpen, setModalPicOpen] = useState(false);


    ///// Local Storage--------------------
    useEffect(() => {
        if (localStorage.getItem(`${title}-events`)) {
            setBoard([...JSON.parse(localStorage.getItem(`${title}-events`))])
        }
        if (localStorage.getItem(`${title}-weather`)) {
            setWeatherBoard(JSON.parse(localStorage.getItem(`${title}-weather`)))
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
        console.log('board', board)
        console.log('weatherBoard', weatherBoard)
    }, [board, weatherBoard]);
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
    const handleSubmit = (eventItem) => {
        addImageToBoard(eventItem);
        setModalOpen(null)
    };

    const handlePicSubmit = (eventItem) => {
        console.log('event', eventItem)
        addImageToBoard(eventItem);
        setModalPicOpen(null)
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "button",
        drop: (eventItem) => {
            if (eventItem.id === 2) {
                setModalOpen(eventItem)
            } else if (eventItem.id === 1) {
                setModalPicOpen(eventItem)
            } else {
                addImageToBoard(eventItem);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (eventItem) => {
        //console.clear()
        //console.log('Event ID', eventItem)
        if (eventItem.id && eventItem.type === 'event') {
            setBoard((board) => [...board, eventItem]);
        }
    };
    /////----------------------------------

    // const removeBoardItemById = (eraseItemId) => {

    //     console.log('board BEFORE remove', board, eraseItemId)
    //     setBoard([...board.filter(item => item.id !== eraseItemId)])
    //     console.log('board AFTER remove', board, eraseItemId)
    // }

    // const removeAllItem = () => {
    //     // console.log('erase from day', eventItem)
    //     setBoard([])
    // }



    return (
        <>
            {modalOpen && <CustomTaskModal eventItem={modalOpen} setModalOpen={setModalOpen} onSubmit={handleSubmit} />}
            {modalPicOpen && <CustomPicModal eventItem={modalPicOpen} setModalPicOpen={setModalPicOpen} onSubmit={handlePicSubmit} />}
            {/* {modalEraseOpen && <EraseModal eraseItem={modalEraseOpen} setModalEraseOpen={setModalEraseOpen} onSubmit={removeAllItem} />} */}


            <div className={`day ${currentDay ? "current-day-day" : ""}`} style={style}>

                <div className={`day-title ${currentDay ? "current-day-title" : ""}`}>
                    {title}</div>

                <div ref={dropWeather} className="day-weather">
                    {weatherBoard && <Weather
                        key={weatherBoard.id}
                        image={weatherBoard.image} />}
                </div>

                <div ref={drop} className="day-events">
                    {board.map((event, index) =>
                        <Event
                            setBoard={setBoard}
                            board={[...board]}
                            index={index}
                            id={board.length}
                            note={event.note}
                            pic={event.pic}
                            title={event.title}
                            image={event.image} />
                    )}
                </div>
            </div>
        </>
    )
}

export default Day

