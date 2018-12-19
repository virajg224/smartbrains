import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';

const particlesParams = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
        params={particlesParams} />
        <Navigation />
        <Rank />
        <ImageLinkForm />
        {/*
        <FaceRecognication />*/}
      </div>
    );
  }
}

export default App;
