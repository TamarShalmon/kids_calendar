import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from "../../context/UserContext";
import { BoardContext } from '../../context/BoardContext';

import "./User.css";

function User({ userId, name }) {
    const { selectUser } = useContext(UserContext);
    const { setWeekbyUser, eventsMenuOpenToggle } = useContext(BoardContext)

    let navigate = useNavigate();

    async function onClickUser(e) {
        e.stopPropagation();
        try {
            const currentSmallUserWeek = await selectUser(userId);
            // console.log("currentSmallUserWeek", currentSmallUserWeek);
            setWeekbyUser(currentSmallUserWeek)
            eventsMenuOpenToggle(false)
            navigate("/calender")
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <button
            id='user'
            onClick={onClickUser}>
            {name}
        </button>
    );
};

export default User