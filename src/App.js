import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
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
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
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

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    });
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

  onRouteChange = (routeData) => {
    if (routeData === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: routeData });
  };

  render() {
    const { route, faceBox, imageUrl, isSignedIn } = this.state;

    let page = null;

    if (route === "signIn") {
      page = <SignIn onRouteChange={this.onRouteChange} />;
    } else if (route === "home") {
      page = (
        <div>
          <Rank />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={faceBox} imageUrl={imageUrl} />
        </div>
      );
    } else if (route === "register") {
      page = <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />;
    }

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}>
          <Logo />
        </Navigation>
        {page}
      </div>
    );
  }
}

export default App;
