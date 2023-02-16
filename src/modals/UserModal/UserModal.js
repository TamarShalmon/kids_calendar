import React, { useState, useContext } from "react";
import { UserContext } from '../../context/UserContext'


import "../CustomTaskModal/CustomTaskModal.css";

function UserModal({ userItem }) {

  const { modalOpenToggle, addUser } = useContext(UserContext);

  const [inputUser, setInputUser] = useState("")


  function handleSubmit(e) {
    e.preventDefault();
    addUser(inputUser);
    setInputUser("");
    modalOpenToggle(null);
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              modalOpenToggle(null);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>What is your name?</h1>
          <p>(3 to 8 characters)</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="body">
            <input
              type="text"
              required
              minlength="3"
              maxlength="8"
              value={inputUser}
              onChange={(e) => setInputUser(e.target.value)}
            />
          </div>
          <div className="footer">
            <button
              onClick={() => {
                modalOpenToggle(null);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;


