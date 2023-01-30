import "./EraseModal.css";
import { useContext } from "react";
import { ModalEraseContext } from './App'


function EraseModal({ removeAll, onSubmit }) {

  const {setModalEraseOpen} = useContext(ModalEraseContext);


  function handleSubmit(e) {
    e.preventDefault();
    console.log("tamar");
    onSubmit(removeAll);
    setModalEraseOpen(null);
  }



  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalEraseOpen(null);
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
                setModalEraseOpen(null);
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