import "./EraseModal.css";
import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { BoardContext } from "../../context/BoardContext";


function EraseModal() {

  const { modalEraseToggle, deleteAllEvents } = useContext(BoardContext);
  const { t } = useTranslation();


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
          <h1>{t('erase-all-items')}</h1>
          <p>{t('want-to-erase')}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="footer">
            <button
              onClick={() => {
                modalEraseToggle(false);
              }}
              id="cancelBtn">
              {t('cancel')}
            </button>
            <button type="submit">{t('yes')}</button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default EraseModal;