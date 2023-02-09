import { useNavigate } from 'react-router-dom';

import "./User.css";

function User({ id, note, }) {

    let navigate = useNavigate();

    return (

        <button id='user' onClick={() => { navigate("/calender") }}>
            {note ? <p>{note}</p> : null}
        </button>

    )
}

export default User