import React, { useState, useContext } from "react";
import {BoardContext} from "../context/BoardContext";
import "./CustomTaskModal.css";

function CustomTaskModal({ setModalPicOpen, onSubmit, eventItem }) {

  const { setModalOpen } = useContext(BoardContext);
  const [inputTask, setInputTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const updatedEventItem = {...eventItem, note: inputTask};
    onSubmit(updatedEventItem);
    setInputTask("");
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
          <h1>Which task you wanna do?</h1>
          <p>(3 to 8 characters)</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="body">
            <input
              type="text"
              required
              minlength="3"
              maxlength="8"
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
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

export default CustomTaskModal;