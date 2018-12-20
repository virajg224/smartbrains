import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Register from './components/Register/Register';
import SignIn from './components/signin/SignIn';
import Rank from './components/rank/Rank';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: ''
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxSet: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  onRouteChange = (route) => {
    if (route === 'signin' || route === 'register') {
      this.setState({isSignedIn: false});
    } else {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFace(this.calculateFace(response)))
      .catch(e => console.log(e))
  }

  calculateFace = (data) => {
    let boxSet = [];
    data.rawData.outputs[0].data.regions.forEach(region => {
      const faceBoundries = region.region_info.bounding_box;
      const image = document.getElementById('image')
      const imageWidth = Number(image.width);
      const imageHeight = Number(image.height)
      boxSet.push({
        leftCol: faceBoundries.left_col * imageWidth,
        rightCol: imageWidth - (faceBoundries.right_col * imageWidth),
        topRow: faceBoundries.top_row * imageHeight,
        bottomRow: imageHeight - (faceBoundries.bottom_row * imageHeight),
      })
    })
  }

  displayFace = (boxSet) => {
    this.setState({boxSet: boxSet})
  }

  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'signin' && <SignIn onRouteChange={this.onRouteChange} /> }
        { this.state.route === 'register' && <Register onRouteChange={this.onRouteChange} /> }
        { this.state.route === 'home' && 
          <div>
            <Rank />
            <ImageLinkForm onSubmit={this.onButtonSubmit} onInputChange={this.onInputChange}/>
            <FaceRecognition imageUrl={this.state.imageUrl} boxSet={this.state.boxSet}/>
          </div> }
      </div>
    );
  }
}

export default App;
