import React, { createContext, useMemo, useState } from "react";
import days from '../assets/data/days'
import { v4 as uuidv4 } from 'uuid';

export const BoardContext = createContext({});

export const BoardContextProvider = ({ children }) => {
    const [modalEraseOpen, setModalEraseOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPicOpen, setModalPicOpen] = useState(false);
    const [eventsMenuOpened, setEventsMenuOpened] = useState(false);
    const [week, setWeek] = useState(days)

    const value = useMemo(() => ({
        week,
        setWeek,
        modalEraseOpen,
        modalOpen,
        modalPicOpen,
        eventsMenuOpened,

        modalEraseToggle: (newState) => setModalEraseOpen(newState),
        modalOpenToggle: (newState) => setModalOpen(newState),
        modalPicOpenToggle: (newState) => setModalPicOpen(newState),
        eventsMenuOpenToggle: (newState) => setEventsMenuOpened(newState),

        setWeekbyUser: (userId) => {
            // Init App
            const initDays = localStorage.getItem(userId) ? JSON.parse(localStorage.getItem(userId)) : days;
            setWeek(initDays)
        },

        // setEventsOfDay: (name, dragIndex, hoverIndex) => {
        //     setWeek((currentWeek) => {
        //         return currentWeek.map((day) => {
        //             if (day.name === name) {
        //                 return {
        //                     ...day,
        //                     eventsList: update(day.eventsList, {
        //                         $splice: [
        //                             [dragIndex, 1],
        //                             [hoverIndex, 0, day.eventsList[dragIndex]],
        //                         ],
        //                     })
        //                 }
        //             } else {
        //                 return day
        //             }
        //         })
        //     })
        // },

        addWeather: (dayName, weatherToAdd) => {
            setWeek((currentWeek) => {
                return currentWeek.map((day, index) => {
                    if (day.name === dayName) {
                        return {
                            ...day,
                            weatherDay: weatherToAdd
                        }
                    } else {
                        return day
                    }
                });
            });
        },

        deleteWeather: (dayName) => {
            setWeek((currentWeek) => {
                return currentWeek.map((day, index) => {
                    if (day.name === dayName) {
                        return {
                            ...day,
                            weatherDay: null
                        }
                    } else {
                        return day
                    }
                });
            });
        },

        addEvent: (dayName, newEventToAdd) => {
            setWeek((currentWeek) => {
                return currentWeek.map((day, index) => {
                    if (day.name === dayName) {

                        return {
                            ...day,
                            eventsList: [...day.eventsList, { ...newEventToAdd, name: day.name, day: dayName, id: uuidv4() }]
                            // eventsList: [...day.eventsList, { ...newEventToAdd, name: day.name, day: dayName, id: day.eventsList.length + 100 }]
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

        sortEvents: (dragIndex, hoverIndex, dayName) => {
            setWeek((currentWeek) => {
                return currentWeek.map(day => {
                    if (day.name === dayName) {
                        const newItems = [...day.eventsList]
                        const draggedItem = newItems[dragIndex];
                        console.log(draggedItem, "dragIndex", dragIndex, "hoverIndex", hoverIndex);
                        newItems.splice(dragIndex, 1);
                        newItems.splice(hoverIndex, 0, draggedItem);
                        return { ...day, eventsList: newItems };
                    } else {
                        return day
                    }
                })
            });
        },

        deleteAllEvents: () => setWeek(days),

    }), [week, modalEraseOpen, modalOpen, modalPicOpen, eventsMenuOpened]);

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
};