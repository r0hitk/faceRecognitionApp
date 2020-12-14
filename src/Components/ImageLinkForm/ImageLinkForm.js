import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className="white">
        {
          "This app detects faces in the pictures which you provide. Give it a go!"
        }
      </p>
      <div className="center">
        <div className="form pa4 br3 shadow-5 center">
          <input className="f5 pa2 w-70 center" type="text" onChange={onInputChange}/>
          <button className="w-30 grow link f5 ph3 pv2 dib white bg-black" onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
