import "./EraseModal.css";
import React, { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";


function EraseModal() {

  const { modalEraseToggle, deleteAllEvents } = useContext(BoardContext);


  function handleSubmit(e) {
    e.preventDefault();
    deleteAllEvents();
    modalEraseToggle(false);
  }


  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              modalEraseToggle(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Erase all items</h1>
          <p>Do you want to erase all item from your calendar?</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="footer">
            <button
              onClick={() => {
                modalEraseToggle(false);
              }}
              id="cancelBtn">
              Cancel
            </button>
            <button type="submit">yes</button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default EraseModal;