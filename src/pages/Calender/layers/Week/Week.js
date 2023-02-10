import { useContext, createContext, useState, useEffect } from 'react';
import { BoardContext } from "../../../../context/BoardContext";
import Day from '../../../../components/Day/Day';
import './Week.css';
import EraseModal from '../../../../modals/EraseModal/EraseModal'
import CustomTaskModal from '../../../../modals/CustomTaskModal/CustomTaskModal'
import CustomPicModal from '../../../../modals/CustomPicModal/CustomPicModal';


function Week() {
    const { week, modalEraseOpen, modalOpen, modalPicOpen, } = useContext(BoardContext);

    const currentDay = new Date().getDay() + 1;

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(week));
    }, [week])

    return (

        <>
            {modalEraseOpen && <EraseModal eraseItem={modalEraseOpen} />}
            {modalOpen && <CustomTaskModal eventItem={modalOpen} />}
            {modalPicOpen && <CustomPicModal eventItem={modalPicOpen} />}


            <div className="week">
                {week.map((day) => (
                    <Day
                        key={day.id}
                        eventsList={day.eventsList}
                        name={day.name}
                        style={day.style}
                        currentDay={currentDay === day.id}
                    />
                ))}
            </div>
        </>
    );
}

export default Week;



