import React, { createContext, useMemo, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [showWelcome, setshowWelcome] = useState(false);
    const [showRegister, setshowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    // const [cookies, setCookies] = useCookies(["access_token"]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const value = useMemo(() => ({
        showWelcome,
        showRegister,
        showLogin,
        // cookies,
        username,
        password,

        showWelcomeToggle: (newState) => setshowWelcome(newState),
        showRegisterToggle: (newState) => setshowRegister(newState),
        showLoginToggle: (newState) => setShowLogin(newState),
        // cookiesToggle: (newState) => setCookies(newState),
        usernameToggle: (newState) => setUsername(newState),
        passwordToggle: (newState) => setPassword(newState),


    }), [showWelcome, showRegister, showLogin, username, password]);

    // }), [showWelcome, showRegister, showLogin, cookies, username, password]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};