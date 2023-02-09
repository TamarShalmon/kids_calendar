import { createContext, useMemo, useState } from "react";
import days from "../days";
export const BoardContext = createContext({});

export const BoardContextProvider = ({ children }) => {
    const [modalEraseOpen, setModalEraseOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPicOpen, setModalPicOpen] = useState(false);

    const [week, setWeek] = useState(days)

    const value = useMemo(() => ({
        week,
        modalEraseOpen,
        modalOpen,
        modalPicOpen,
        modalEraseToggle: (newState) => setModalEraseOpen(newState),
        modalOpen: (newState) => setModalOpen(newState),
        modalPicOpen: (newState) => setModalPicOpen(newState),
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