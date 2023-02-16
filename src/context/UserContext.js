import { createContext, useMemo, useState } from "react";
import days from '../assets/data/days'

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false);


    // InitApp
    const savedUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const [users, setUsers] = useState(savedUsers);


    const value = useMemo(() => ({
        users,
        modalOpen,
        modalOpenToggle: (newState) => setModalOpen(newState),
        addUser: (newUserToAdd) => {
            console.log(newUserToAdd)

            if (newUserToAdd) {
                setUsers((users) => [...users, { name: newUserToAdd, id: users.length, week: days }]);
            }
        },
        selectUser: (userId) => {
            setUsers((users) => users.map((user) => {
                if (user.id === userId) {
                    return {
                        ...user,
                        active: true
                    }
                } else {
                    return {
                        ...user,
                        active: false
                    }
                }
            }))
        },
        logoutUser: () => {
            setUsers((users) => users.map((user) => {
                return {
                    ...user,
                    active: false
                }
            }))
        }



    }), [users, modalOpen,]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};