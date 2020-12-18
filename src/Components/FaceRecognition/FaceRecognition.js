import React from "react";

const FaceRecognition = ({imageUrl}) => {
  return (
    <div className="center ma4">
      <img id ="inputimg" src={imageUrl} alt="" width="500px" height="auto"/>
    </div>
  );
};

export default FaceRecognition;