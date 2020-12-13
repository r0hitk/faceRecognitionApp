import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = () => {
  return (
    <div>
      <p>
        {
          "This application detects faces in the pictures which you provide. Give it a go!"
        }
      </p>
      <div className="center">
        <div className="form pa4 br3 shadow-5 center">
          <input className="f5 pa2 w-70 center" type="text" />
          <button className="w-30 grow link f5 ph3 pv2 dib white bg-black">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
