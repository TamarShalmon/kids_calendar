import React, { useContext, useEffect } from 'react';
import { BoardContext } from "../../../../context/BoardContext";
import { UserContext } from "../../../../context/UserContext";
import { useTranslation } from 'react-i18next';


import './Week.css';
import Day from '../../../../components/Day/Day';
import EraseModal from '../../../../modals/EraseModal/EraseModal'
import CustomTaskModal from '../../../../modals/CustomTaskModal/CustomTaskModal'
import CustomPicModal from '../../../../modals/CustomPicModal/CustomPicModal';


function Week() {
    const { t } = useTranslation();

    const { week, modalEraseOpen, modalOpen, modalPicOpen, eventsMenuOpened } = useContext(BoardContext);
    const { users } = useContext(UserContext);
    let activeUserId = users.filter((user) => user.active)[0]._id;

    const currentDay = new Date().getDay() + 1;

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users])

    useEffect(() => {
        // console.log('Week updated', week)
        localStorage.setItem(activeUserId, JSON.stringify(week));
    }, [week])

    return (

        <>
            {modalEraseOpen && <EraseModal eraseItem={modalEraseOpen} />}
            {modalOpen && <CustomTaskModal eventItem={modalOpen} />}
            {modalPicOpen && <CustomPicModal eventItem={modalPicOpen} />}


            <div className={`week ${eventsMenuOpened && 'events-menu-open'}`}>
                {week.map((day) => (
                    <Day
                        key={day.id}
                        eventsList={day.eventsList}
                        weatherDay={day.weatherDay}
                        name={t(day.name)}
                        style={day.style}
                        currentDay={String(currentDay) === String(day.id)}
                    />)
                )}
            </div>
        </>
    );
}

export default Week;



