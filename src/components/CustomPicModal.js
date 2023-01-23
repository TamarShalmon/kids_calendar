import Slider from '@mui/joy/Slider';
import React, { useRef, useState } from "react";
import AvatarEditor from 'react-avatar-editor'
import "./CustomPicModal.css";


const CustomPicModal = ({ setModalPicOpen, onSubmit, eventItem }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

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
    onSubmit({ ...eventItem, originalPic: imagePreviewUrl, pic: imgUrl });
    setModalPicOpen(null);
  };

  return (
    <div className="PICmodalBackground">
      <div className="PICmodalContainer">
        <div className="PICtitleCloseBtn">
          <button onClick={() => setModalPicOpen(null)}>
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
                src="/refresh.png" />
              {/* <Slider 
                min={1}
                max={2}
                step={0.1}
                value={scale}
                onChange={(e, newValue) => setScale(newValue)} /> */}
              <input type="range" min="1" max="2" step="0.1" value={scale} onChange={e => setScale(+e.target.value)} />
            </div>
          </div>

          <div className="PICfooter">
            <button onClick={() => setModalPicOpen(null)} id="cancelBtn">
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