import "./User.css";

function User({ id, note, }) {



    return (

        <button id='user'>
            {note ? <p>{note}</p> : null}
        </button>

    )
}

export default User