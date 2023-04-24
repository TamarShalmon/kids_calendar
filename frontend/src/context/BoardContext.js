import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import days from '../assets/data/days'
import { v4 as uuidv4 } from 'uuid';
import update from "immutability-helper";
import { UserContext } from "./UserContext";
import apiReq from "../global/apiReq";
import { useCookies } from "react-cookie";

export const BoardContext = createContext({});

export const BoardContextProvider = ({ children }) => {
    const [modalEraseOpen, setModalEraseOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPicOpen, setModalPicOpen] = useState(false);
    const [eventsMenuOpened, setEventsMenuOpened] = useState(false);
    const [week, setWeek] = useState(days)
    const [cookies] = useCookies(["access_token"])
    const { users, mainUser } = useContext(UserContext)

    async function updateWeek(id, week) {
        try {
            const token = cookies.access_token
            const user = await apiReq({ url: `small-user/update/${id}`, data: { week }, token, method: "PUT" })
            console.log(user);
        } catch (error) {

        }
    }

    useEffect(() => {
        const curr = users.find(u => u.active)   
        console.log(mainUser?.token , curr , week.length);
        if (mainUser?.token && curr && week.length){
            updateWeek(curr?._id, week)
        }
    }, [week])
    
    // TODO- onrefresh bring the current
    useEffect(() => {
        const curr = users.find(u => u.active)   
        console.log("refresh", curr );
    }, [])


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

        setWeekbyUser: (userId, initDays ) => {
            // Init App
            if (userId = '643f06ffec4c3f7fa44d9d3a'){ //TODO - guest
                 initDays = localStorage.getItem(userId) ? JSON.parse(localStorage.getItem(userId)) : days;
            } 
            if (!initDays?.length){
                initDays =  days
            }
            setWeek(initDays)
        },

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