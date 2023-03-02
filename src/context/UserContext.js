import React, { createContext, useMemo, useState } from "react";
import days from '../assets/data/days'

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [showDeleteIcons, setShowDeleteIcons] = useState(false);



    // InitApp
    const savedUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const [users, setUsers] = useState(savedUsers);


    const value = useMemo(() => ({
        users,
        modalOpen,
        showDeleteIcons,

        modalOpenToggle: (newState) => setModalOpen(newState),

        deleteIconsToggle: (newState) => setShowDeleteIcons(newState),

        addUser: (newUserToAdd) => {
            if (newUserToAdd) {
                setUsers((users) => [
                    ...users,
                    { name: newUserToAdd, id: users.length, active: false }
                ]);
            }
        },

        selectUser: (userId) => {
            setUsers((users) => users.map((user) => {
                return {
                    ...user,
                    active: user.id === userId
                }
            }))
        },

        deleteUser: (userId) => {
            setUsers((users) => users.filter((user) => user.id !== userId));
        },

    }), [users, modalOpen, showDeleteIcons]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};