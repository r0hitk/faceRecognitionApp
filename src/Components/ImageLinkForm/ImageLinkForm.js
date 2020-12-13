import React from "react";

const ImageLinkForm = () => {
  return (<div>
<p>{"This application detects faces in the pictures which you provide. Give it a go!"}</p>
<div>
    <input className="f5 pa2 w-70 center" type="text"/>
    <button className="w-30 grow link f5 ph3 pv2 dib white bg-green">Detect</button>
</div>
  </div>
  );
};

export default ImageLinkForm;
