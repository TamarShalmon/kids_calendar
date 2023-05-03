import React, { createContext, useMemo, useState } from "react";
import days from '../assets/data/days'
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import apiReq from "../global/apiReq";
import "../components/User/User.css";




export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [showDeleteIcons, setShowDeleteIcons] = useState(false);
    const [loading, setLoading] = useState(false);


    // InitApp
    const savedUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const [users, setUsers] = useState(savedUsers);

    const savedMainUser = localStorage.getItem('mainUser') ? JSON.parse(localStorage.getItem('mainUser')) : null;
    const [mainUser, setMainUser] = useState(savedMainUser);

    const [cookies, setCookies] = useCookies(["access_token"]);

    useEffect(() => {
        if (localStorage.mainUser) {
            setCookies("access_token", savedMainUser.token);
        }
    }, [])



    const value = useMemo(() => ({
        mainUser,
        users,
        modalOpen,
        showDeleteIcons,

        modalOpenToggle: (newState) => setModalOpen(newState),

        deleteIconsToggle: (newState) => setShowDeleteIcons(newState),

        login: (newMainUserToAdd) => {
            setMainUser(newMainUserToAdd)
            setUsers(newMainUserToAdd.smallUsers)
        },

        logout: () => {
            setCookies("access_token", "");
            setMainUser();
            localStorage.clear()
        },

        addUser: (newUserToAdd) => {
            if (newUserToAdd) {
                setUsers((users) => [
                    ...users,
                    { ...newUserToAdd, active: false }
                ]);
            }
        },

        selectUser: (userId) => {
            setUsers((users) => users.map((user) => {
                return {
                    ...user,
                    active: user._id === userId
                }
            }))
        },

        deleteUser: async (userId) => {
            setLoading(true);

            const token = cookies.access_token

            const newSmallUsers = await apiReq({
                url: `small-user/delete-one/${userId}`,
                method: "DELETE", token
            })
            localStorage.users = JSON.stringify(newSmallUsers)
            setUsers(newSmallUsers)

            setLoading(false);

        },

    }), [mainUser, users, modalOpen, showDeleteIcons]);

    return (
        <UserContext.Provider value={value}>
            {loading && <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div>}

            {children}
        </UserContext.Provider>
    );
};