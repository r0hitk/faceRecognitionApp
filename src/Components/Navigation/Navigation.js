import React from "react";

const Navigation = (props) => {

  if(props.isSignedIn){
    return (
      <nav style={{display: "flex", justifyContent:"space-between", height: "200px", marginTop: "2rem"}}>
          {props.children}
          <p className="f3 mr2 link dim black underline pa2 pointer" onClick={()=>props.onRouteChange("signIn")}>Sign Out</p>
      </nav>
    );
  }
  else{
    return (
      <nav style={{display: "flex", justifyContent:"space-between", height: "200px", marginTop: "2rem"}}>
          {props.children}
          <p className="f3 mr2 link dim black underline pa2 pointer" onClick={()=>props.onRouteChange("signIn")}>Sign In</p>
      </nav>
    );
  }
 
};

export default Navigation;
