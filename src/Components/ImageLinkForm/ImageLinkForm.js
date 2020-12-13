import React from "react";

const ImageLinkForm = () => {
  return (<div>
<p>{"This application detects faces in the pictures which you provide. Give it a go!"}</p>
<div>
    <input className="f4 pa2 w-70" type="text"/>
    <button>Detect</button>
</div>
  </div>
  );
};

export default ImageLinkForm;
