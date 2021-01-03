import React from "react";

const Rank = ({name,entries}) => {
  return (
    <div>
      <div className="black f3">{name}{", your current entries count is..."}</div>
      <div className="black f3">{"#"}{entries}</div>
    </div>
  );
};

export default Rank;
