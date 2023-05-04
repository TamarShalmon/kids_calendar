import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'

import { UserContext } from "../../context/UserContext";
import { BoardContext } from '../../context/BoardContext';

import "./User.css";
import { useState } from 'react';
import apiReq from '../../global/apiReq';
import { useCookies } from 'react-cookie';

function User({ userId, name }) {
    const { selectUser } = useContext(UserContext);
    const { setWeekbyUser, eventsMenuOpenToggle } = useContext(BoardContext)
    const [loading, setLoading] = useState()

    const [cookies] = useCookies(["access_token"])


    let navigate = useNavigate();

    function onClickUser(e) {
        e.stopPropagation();
        selectUser(userId)
        // setWeekbyUser(userId, currentSmallUser.week)
        // eventsMenuOpenToggle(false)
        navigate("/calender")
    }


    return (
        <>
            {/* {loading && <div className="loader"><div className="lds-ripple"><div></div><div></div></div></div>} */}
            <button
                id='user'
                style={{ fontFamily: 'Neucha, Rubik' }}
                onClick={onClickUser}>
                {name}
            </button>
        </>
    )
}

export default User