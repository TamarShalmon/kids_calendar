import React, { useState, useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import "./CustomTaskModal.css";

function CustomTaskModal({ eventItem }) {

  const [inputTask, setInputTask] = useState("");

  const { modalOpenToggle, addEvent } = useContext(BoardContext);


  function handleSubmit(e) {
    e.preventDefault();
    const updatedEventItem = { ...eventItem, note: inputTask };
    addEvent(eventItem.day, updatedEventItem);
    setInputTask("");
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

export default CustomTaskModal;