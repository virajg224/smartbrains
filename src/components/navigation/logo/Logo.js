import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png'

const Logo = () => {
  return (
    <div>
      <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3"> 
          <img src={brain} alt='logo'/>
          <h1>SmartBrain</h1>
        </div>
      </Tilt>
    </div>
  )
}


export default Logo;