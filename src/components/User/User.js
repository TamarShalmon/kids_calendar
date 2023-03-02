import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'

import "./User.css";
import { UserContext } from "../../context/UserContext";
import { BoardContext } from '../../context/BoardContext';

function User({ userId, name }) {
    const { selectUser } = useContext(UserContext);
    const { setWeekbyUser } = useContext(BoardContext)

    let navigate = useNavigate();

    return (

        <button id='user' onClick={() => { 
            selectUser(userId)
            setWeekbyUser(userId)
            navigate("/calender")
            }}>
            {name}
        </button>

    )
}

export default User