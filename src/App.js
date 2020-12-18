import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "74f2cfdb14c94d0fa17ddc7e8d6976c6",
});

const particleOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "white",
        blur: 5,
      },
    },

    number: {
      value: 100,
      density: {
        value_area: 700,
        enable: true,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      faceBox: ""
    };
  }

  calculateFaceOutline = (data) => {
    let apiData = data.outputs[0].data.regions[0].region_info.bounding_box;

    let image = document.getElementById("inputimg");

    let width = image.width;
    let height = image.height;
    //console.log(apiData);
    return {
      leftCol: apiData.left_col * width,
      topRow: apiData.top_row * height,
      rightCol: width - apiData.right_col * width,
      bottomRow: height - apiData.bottom_row * height,
    };
  };

  defineFace = (box) => {
    this.setState({ faceBox: box });
  };

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.defineFace(this.calculateFaceOutline(response));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation>
          <Logo />
        </Navigation>
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
