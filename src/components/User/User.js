import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'

import "./User.css";
import { UserContext } from "../../context/UserContext";
import { BoardContext } from '../../context/BoardContext';

function User({ id, name }) {
    const { selectUser } = useContext(UserContext);
    const { setWeekbyUser } = useContext(BoardContext)

    let navigate = useNavigate();

    return (

        <button id='user' onClick={() => { 
            selectUser(id)
            setWeekbyUser(id)
            navigate("/calender")
            }}>
            {name}
        </button>

    )
}

export default User