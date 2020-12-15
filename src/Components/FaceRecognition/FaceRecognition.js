import React from "react";

const FaceRecognition = ({imageUrl}) => {
  return (
    <div className="center">
      <img src={imageUrl} alt="entered url output"/>
    </div>
  );
};

export default FaceRecognition;