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

    async function onClickUser() {
        setLoading(true) //TODO = show loader fix css
        try {
            const token = cookies.access_token
            // api
            // get user by id >> 
            // update context - week
            // update context - current user
            const currentSmallUser = await apiReq({ url: `small-user/read-one/${userId}`, method: "GET", token })
            console.log(currentSmallUser);
            selectUser(userId)
            setWeekbyUser(userId, currentSmallUser.week)
            eventsMenuOpenToggle(false)
            navigate("/calender")
        } catch (error) {

        } finally {
            setLoading()
        }
    }

    return (
        <>
            <button
                id='user'
                style={{ fontFamily: 'Neucha, Rubik' }}
                onClick={onClickUser}>
                {name}
            </button>
            {loading && null}
        </>
    )
}

export default User