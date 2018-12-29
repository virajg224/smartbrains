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
 apiKey: '29f5b905dc96470bbbee71a688900f6c'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxSet: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      },
      pictureError: false,
    }
  }

  onRouteChange = (route) => {
    if (route === 'signin' || route === 'register') {
      this.setState({
        isSignedIn: false,
        input: '',
        imageUrl: '',
        boxSet: [],      
        });
    } else {
      this.setState({
        isSignedIn: true,
        input: '',
        imageUrl: '',
        boxSet: [],        
      });
    }
    this.setState({route: route});
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
      pictureError: true
      });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
            })
        })
          .then(response => response.json())
          .then(entries => {
            if (entries){
              this.setState(Object.assign(this.state.user, { entries: entries }))
            }
          })
        }
        this.displayFace(this.calculateFace(response))
      })
      .catch(e => {
        console.log("Error", e)
        this.setState({pictureError: true})
      })
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
    return boxSet;
  }

  displayFace = (boxSet) => {
    this.setState({boxSet: boxSet})
  }

  loadUser = (user) => {
    this.setState({user : {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
    }})
  }

  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'signin' && <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> }
        { this.state.route === 'register' && <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> }
        { this.state.route === 'home' && 
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onSubmit={this.onButtonSubmit} onInputChange={this.onInputChange}/>
            <FaceRecognition imageUrl={this.state.imageUrl} boxSet={this.state.boxSet}/>
          </div> }
      </div>
    );
  }
}

export default App;
