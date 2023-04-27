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

    const curr = users?.find(u => u.active)

    async function updateWeek(id, week) {
        const token = cookies.access_token
        const user = await apiReq({ url: `small-user/update/${id}`, data: { week }, token, method: "PUT" })
        console.log('server update week', week, user);
    }

    useEffect(() => {
        console.log('Use Effect ran')
        async function getUser() {
            const token = cookies.access_token

            if (curr?._id && token) {
                const currentSmallUser = await apiReq({ url: `small-user/read-one/${curr?._id}`, method: "GET", token })
                //console.log('refresh', currentSmallUser);
                setWeek(currentSmallUser.week)
            }
        }
        getUser()
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

        setWeekbyUser: (userId, initDays) => {
            // Init App
            initDays = localStorage.getItem(userId) ? JSON.parse(localStorage.getItem(userId)) : days;
            setWeek(initDays)
        },

        addWeather: (dayName, weatherToAdd) => {
            setWeek(tempWeek => {
                const temp = tempWeek.map((day, index) => {
                    if (day.name === dayName) {
                        return {
                            ...day,
                            weatherDay: weatherToAdd
                        }
                    } else {
                        return day
                    }
                });
                updateWeek(curr?._id, temp)
                return temp
            });
        },

        deleteWeather: (dayName) => {
            setWeek(tempWeek => {
                const temp = tempWeek.map((day, index) => {
                    if (day.name === dayName) {
                        return {
                            ...day,
                            weatherDay: null
                        }
                    } else {
                        return day
                    }
                });
                updateWeek(curr?._id, temp)
                return temp
            });
        },

        addEvent: (dayName, newEventToAdd) => {
            setWeek(tempWeek => {
                const temp = tempWeek.map((day, index) => {
                    if (day.name === dayName) {
                        return {
                            ...day,
                            eventsList: [...day.eventsList, { ...newEventToAdd, name: day.name, day: dayName, id: uuidv4() }]
                        }

                    } else {
                        return day
                    }
                });
                updateWeek(curr?._id, temp)
                return temp
            })
        },

        deleteEvent: (dayName, eventId) => {
            setWeek(tempWeek => {
                const temp = tempWeek.map((day, index) => {
                    if (day.name === dayName) {
                        return {
                            ...day,
                            eventsList: day.eventsList.filter((event) => event.id !== eventId)
                        }
                    } else {
                        return day
                    }
                });
                updateWeek(curr?._id, temp)
                return temp
            });
        },

        sortEvents: (dragId, hoverId, dayName) => {
            setWeek(tempWeek => {
                const temp = tempWeek.map(day => {
                    if (day.name === dayName) {
                        const newItems = [...day.eventsList]
                        const dragIndex = newItems.findIndex(it => it.id === dragId)
                        const hoverIndex = newItems.findIndex(it => it.id === hoverId)
                        // console.log(dragIndex, hoverIndex);
                        const draggedItem = newItems[dragIndex];
                        newItems.splice(dragIndex, 1);
                        newItems.splice(hoverIndex, 0, draggedItem);
                        return { ...day, eventsList: newItems };
                    } else {
                        return day
                    }
                });
                updateWeek(curr?._id, temp)
                return temp
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