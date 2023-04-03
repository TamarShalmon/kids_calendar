import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'

import { UserContext } from "../../context/UserContext";
import { BoardContext } from '../../context/BoardContext';

import "./User.css";

function User({ userId, name }) {
    const { selectUser } = useContext(UserContext);
    const { setWeekbyUser, eventsMenuOpenToggle } = useContext(BoardContext)


    let navigate = useNavigate();

    return (

        <button
            id='user'
            style={{ fontFamily: 'Neucha, Rubik' }}
            onClick={() => {
                selectUser(userId)
                setWeekbyUser(userId)
                eventsMenuOpenToggle(false)
                navigate("/calender")
            }}>
            {name}
        </button>

    )
}

export default User