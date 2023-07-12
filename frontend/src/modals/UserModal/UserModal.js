import React, { useState, useContext } from "react";
import { UserContext } from '../../context/UserContext'
import { BoardContext } from '../../context/BoardContext';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import "../UserModal/UserModal.css";


function UserModal() {

  const { modalOpenToggle, addUser, selectUser } = useContext(UserContext);
  const { setWeekbyUser, eventsMenuOpenToggle } = useContext(BoardContext)
  const [inputUser, setInputUser] = useState("")
  const { t } = useTranslation();


  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setInputUser("");
    modalOpenToggle(null);
    const userId = await addUser({ name: inputUser })
    const currentSmallUserWeek = await selectUser(userId);
    setWeekbyUser(currentSmallUserWeek.week);
    eventsMenuOpenToggle(null)
    navigate("/calender")
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => { modalOpenToggle(null) }}>
            X
          </button>
        </div>
        <div className="title">
          <h1>{t('your-name')}</h1>
          <p>{t('characters')}</p>
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
              onChange={(e) => setInputUser(e.target.value)} />
          </div>
          <div className="footer">
            <button
              onClick={() => { modalOpenToggle(null) }}
              id="cancelBtn" >
              {t('cancel')}
            </button>
            <button type="submit">{t('submit')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;


