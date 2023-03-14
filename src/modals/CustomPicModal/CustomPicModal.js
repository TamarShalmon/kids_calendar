import Slider from '@mui/material/Slider';
import React, { useContext, useRef, useState } from "react";
import AvatarEditor from 'react-avatar-editor'
import { BoardContext } from '../../context/BoardContext';
import "./CustomPicModal.css";


const CustomPicModal = ({ eventItem }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const { modalPicOpenToggle, addEvent } = useContext(BoardContext);

  const editor = useRef()

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handlePicSubmit = async (e) => {
    e.preventDefault();
    let canvas = editor.current.getImageScaledToCanvas().toDataURL();
    let blob = await fetch(canvas).then(r => r.blob());
    let imgUrl = URL.createObjectURL(blob);
    addEvent(eventItem.day, { ...eventItem, originalPic: imagePreviewUrl, pic: imgUrl });
    modalPicOpenToggle(null);
  };


  return (
    <div className="PICmodalBackground">
      <div className="PICmodalContainer">
        <div className="PICtitleCloseBtn">
          <button onClick={() => modalPicOpenToggle(null)}>
            X
          </button>
        </div>
        <div className="PICtitle">
          <h1>Choose a photo from your gallery</h1>
        </div>
        <form onSubmit={handlePicSubmit}>
          <div className="PICbody">
            <input
              required
              type="file"
              accept=".jpg, .jpeg, .png"
              id='font-file'
              onChange={handleImageChange}
            />
            <div className="PICdiv-image-preview">

              {imagePreviewUrl && (
                <AvatarEditor
                  ref={editor}
                  className="PICimage-preview"
                  image={imagePreviewUrl}
                  width={200}
                  height={180}
                  border={30}
                  color={[255, 255, 255, 0.6]}
                  scale={scale}
                  rotate={rotate}
                />
              )}
            </div>
            <div className="edit-flex">
              <img
                className="rotate-img"
                onClick={() => setRotate(rotate + 90)}
                src={`/images/refresh.png`} />
                <Slider sx={{ width: 250, color: "#313131" }}
                  min={1}
                  max={5}
                  step={0.1}
                  value={scale}
                  onChange={(e, newValue) => setScale(newValue)}
                />
              {/* <input type="range" min="1" max="5" step="0.1" value={scale} onChange={e => setScale(+e.target.value)} /> */}
            </div>
          </div>

          <div className="PICfooter">
            <button onClick={() => modalPicOpenToggle(null)} id="cancelBtn">
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomPicModal;