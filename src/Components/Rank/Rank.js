import React from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";

const Rank = () => {
  return (
    <div>
      <div className="black f3">{"Rohit, your current rank is..."}</div>
      <div className="black f3">{"#5"}</div>
    </div>
  );
};

export default Rank;
