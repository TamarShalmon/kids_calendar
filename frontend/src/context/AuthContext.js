import React, { createContext, useMemo, useState } from "react";
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [showWwlcome, setshowWelcome] = useState(false);
    const [showRegister, setshowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const value = useMemo(() => ({
        showWwlcome,
        showRegister,
        showLogin,

        showWwlcomeToggle: (newState) => setshowWelcome(newState),
        showRegisterToggle: (newState) => setshowRegister(newState),
        showLoginToggle: (newState) => setShowLogin(newState),

    }), [showWwlcome, showRegister, showLogin]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};