import React, { useState } from "react";
import "./CustomPicModal.css";

function CustomPicModal({ setModalPicOpen, onSubmit, eventItem }) {
  const [inputTask, setInputTask] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  function handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    }

    reader.readAsDataURL(file)
  }

  function handlePicSubmit(e) {
    e.preventDefault();
    const updatedEventItem = { ...eventItem, pic: inputTask };
    onSubmit(updatedEventItem);
    setInputTask("");
    setModalPicOpen(null);
  }

  return (
    <div className="PICmodalBackground">
      <div className="PICmodalContainer">
        <div className="PICtitleCloseBtn">
          <button
            onClick={() => {
              setModalPicOpen(null);
            }}
          >
            X
          </button>
        </div>
        <div className="PICtitle">
          <h1>Choose a photo from your gallery</h1>
        </div>
        <form onSubmit={handlePicSubmit}>
          <div className="PICbody">
            <input
              type="file"
              required
              onChange={handleImageChange} />
              <div className="PICdiv-image-preview">
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt="Selected Image" className="PICimage-preview" />
            )}
            </div>
          </div>
          <div className="PICfooter">
            <button
              onClick={() => {
                setModalPicOpen(null);
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

export default CustomPicModal;