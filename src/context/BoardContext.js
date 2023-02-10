import { createContext, useMemo, useState } from "react";
import days from '../assets/data/days'
export const BoardContext = createContext({});

export const BoardContextProvider = ({ children }) => {
    const [modalEraseOpen, setModalEraseOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPicOpen, setModalPicOpen] = useState(false);

    // Init App
    const initDays = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : days;
    const [week, setWeek] = useState(initDays)

    const value = useMemo(() => ({
        week,
        modalEraseOpen,
        modalOpen,
        modalPicOpen,
        modalEraseToggle: (newState) => setModalEraseOpen(newState),
        modalOpenToggle: (newState) => setModalOpen(newState),
        modalPicOpenToggle: (newState) => setModalPicOpen(newState),
        addEvent: (dayName, newEventToAdd) => {
            setWeek((currentWeek) => {
                return currentWeek.map((day, index) => {
                    if (day.name === dayName) {
                        return {
                            ...day,
                            eventsList: [...day.eventsList, { ...newEventToAdd, day: dayName, id: day.eventsList.length }]
                        }
                    } else {
                        return day
                    }
                });
            });
        },
        deleteEvent: (dayName, eventId) => {
            setWeek((currentWeek) => {
                return currentWeek.map((day, index) => {
                    if (day.name === dayName) {
                        return {
                            ...day,
                            eventsList: day.eventsList.filter((event) => event.id !== eventId)
                        }
                    } else {
                        return day
                    }
                });
            });
        },
        deleteAllEvents: () => setWeek(days)
    }), [week, modalEraseOpen, modalOpen, modalPicOpen]);

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
};