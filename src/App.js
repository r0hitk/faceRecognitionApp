import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {/*<Logo/>
        <ImageInputForm/>
        <FaceRecognition/>
        */}
      </div>
    );
  }
}

export default App;
