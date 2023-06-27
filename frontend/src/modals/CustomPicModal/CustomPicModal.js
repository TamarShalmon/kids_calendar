import Slider from '@mui/material/Slider';
import React, { useContext, useRef, useState } from "react";
import AvatarEditor from 'react-avatar-editor'
import { BoardContext } from '../../context/BoardContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import "./CustomPicModal.css";


const CustomPicModal = ({ eventItem }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [file, setFile] = useState("")
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const { modalPicOpenToggle, addEvent } = useContext(BoardContext);
  const { t } = useTranslation();

  const editor = useRef()

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    // const fileSizeLimit = 200 * 1024; // 200KB (in bytes)
    // if (file && file.size <= fileSizeLimit) {
    setFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    // } else {
    //   toast.error("You can upload images up to 200KB");
    // }
  };

  const handlePicSubmit = async (e) => {
    e.preventDefault();
    let canvas = editor.current.getImageScaledToCanvas().toDataURL();
    let blob = await fetch(canvas).then(r => r.blob());
    // let imgUrl = URL.createObjectURL(blob);

    const fromData = new FormData();
    fromData.append("file", blob);
    fromData.append("upload_preset", "z2uknpel1");

    axios.post(
      "https://api.cloudinary.com/v1_1/dnfqzyh4r/image/upload", fromData
    ).then((res) => {
      // console.log(res);
      addEvent(eventItem.day, { ...eventItem, originalPic: imagePreviewUrl, pic: res.data.secure_url });
    });
    modalPicOpenToggle(null);
  };


  return (
    <div className="PIC-modalBackground">
      <div className="PIC-modalContainer">
        <div className="PIC-titleCloseBtn">
          <button onClick={() => modalPicOpenToggle(null)}>
            X
          </button>
        </div>
        <div className="PIC-title">
          <h1 className='PIC-h1'>{t('pic-modal')}</h1>
          {/* <p className='PIC-p'>You can upload images up to 200KB</p> */}
        </div>
        <form onSubmit={handlePicSubmit}>
          <div className="PIC-body">
            <input
              className="PIC-input-modal"
              required
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
            />
            <div className="PIC-div-image-preview">
              {imagePreviewUrl && (
                <AvatarEditor
                  ref={editor}
                  className="PIC-image-preview"
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
                src={`/images/refresh.png`}
                alt='rotate-img' />
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

          <div className="PIC-footer">
            <button className='PIC-button' onClick={() => modalPicOpenToggle(null)} id="cancelBtn">
              {t('cancel')}
            </button>
            <button className='PIC-button' type="submit">
              {t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomPicModal;