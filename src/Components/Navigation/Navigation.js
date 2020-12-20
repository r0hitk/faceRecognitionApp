import React from "react";

const Navigation = (props) => {
  return (
    <nav style={{display: "flex", justifyContent:"space-between", marginTop: "2rem"}}>
        {props.children}
        <p className="f3 mr2 link dim black underline pa2 pointer" onClick={()=>props.onRouteChange("signIn")}>Sign Out</p>
    </nav>
  );
};

export default Navigation;
