import React, { createContext, useMemo, useState } from "react";
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

        addUser: async (newUserToAdd) => {
            setLoading(true);
            const token = cookies.access_token;
            const newSmallUser = await apiReq({
                url: "small-user/create-user",
                data: { name: newUserToAdd.name },
                method: "POST", token,
            });
            if (newSmallUser) {
                setUsers((users) => [...users, { ...newSmallUser, active: false }]);
            }
            setLoading(false);
            return newSmallUser._id;
        },

        selectUser: async (userId) => {
            setLoading(true);
            const token = cookies.access_token
            const currentSmallUser = await apiReq({
                url: `small-user/read-one/${userId}`, 
                method: "GET", token
            })
            console.log(currentSmallUser);
            setUsers((users) => users.map((user) => {
                return {
                    ...user,
                    active: user._id === userId
                }
            }))
            setLoading(false);
            return currentSmallUser.week;
        },

        deleteUser: async (userId) => {
            setLoading(true);
            const token = cookies.access_token
            const deleteSmallUsers = await apiReq({
                url: `small-user/delete-one/${userId}`,
                method: "DELETE", token
            })
            localStorage.users = JSON.stringify(deleteSmallUsers)
            setUsers(deleteSmallUsers)
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