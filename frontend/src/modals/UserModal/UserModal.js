import React, { useState, useContext } from "react";
import { UserContext } from '../../context/UserContext'


import "../UserModal/UserModal.css";
import { useCookies } from "react-cookie";
import apiReq from "../../global/apiReq";

function UserModal({ userItem }) {
  const [cookies] = useCookies(["access_token"])

  const { modalOpenToggle, addUser } = useContext(UserContext);

  const [inputUser, setInputUser] = useState("")


  async function handleSubmit(e) {
    e.preventDefault();
    const token =cookies.access_token
    const newUser = await apiReq({url: 'small-user/create-user' ,data : {name: inputUser}, method :"POST", token})
    addUser(newUser);
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
              className="input"
              type="text"
              required
              minLength="3"
              maxLength="8"
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


