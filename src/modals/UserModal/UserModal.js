import React, { useState, useContext } from "react";
import { UsersContext } from '../../context/BoardContext'


import "../CustomTaskModal/CustomTaskModal.css";

function UserModal({ setModalOpen, onSubmit, eventItem }) {
 
  //const {inputUser, setInputUser} = useContext(UsersContext);
    const [inputUser, setInputUser]= useState("")


  function handleSubmit(e) {
    e.preventDefault();
    const updatedEventItem = {...eventItem, note: inputUser};
    onSubmit(updatedEventItem);
    setInputUser("");
    setModalOpen(null); 
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(null);
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
                setModalOpen(null);
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


