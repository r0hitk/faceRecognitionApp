import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import SignIn from "./Components/SignIn/SignIn";
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
      faceBox: "",
      route: "signIn",
    };
  }

  calculateFaceOutline = (data) => {
    let apiData = data.outputs[0].data.regions[0].region_info.bounding_box;
    let apiDatats = data.outputs[0].data;
    let image = document.getElementById("inputimg");

    let width = Number(image.width);
    let height = Number(image.height);
    console.log(apiDatats);
    return {
      leftCol: apiData.left_col * width,
      topRow: apiData.top_row * height,
      rightCol: width - apiData.right_col * width,
      bottomRow: height - apiData.bottom_row * height,
    };
  };

  defineFace = (faceBox) => {
    console.log(faceBox);
    this.setState({ faceBox: faceBox });
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

  onRouteChange = () => {
    this.setState({ route: "home" });
  };

  render() {
    let page = null;

    if (this.state.route === "signIn") {
      page = <SignIn onRouteChange={this.onRouteChange} />;
    }

    if (this.state.route === "home") {
      page = (
        <div>
          <Rank />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition
            box={this.state.faceBox}
            imageUrl={this.state.imageUrl}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation>
          <Logo />
        </Navigation>
        {page}
      </div>
    );
  }
}

export default App;
