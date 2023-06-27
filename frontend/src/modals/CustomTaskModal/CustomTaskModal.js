import React, { useState, useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import { useTranslation } from 'react-i18next';

import "./CustomTaskModal.css";

function CustomTaskModal({ eventItem }) {

  const [inputTask, setInputTask] = useState("");
  const { modalOpenToggle, addEvent } = useContext(BoardContext);

  const { t } = useTranslation();


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
          <h1>{t('task')}</h1>
          <p>{t('characters')}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="body">
            <input
              className="input-modal"
              type="text"
              required
              minLength="3"
              maxLength="8"
              value={inputTask}
              dir="auto"
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
              {t('cancel')}
            </button>
            <button type="submit">
              {t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomTaskModal;