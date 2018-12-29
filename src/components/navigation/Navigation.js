import React from 'react';
import Logo from './logo/Logo';

const Navigation = ({ onRouteChange, currentRoute }) => {
  if (currentRoute === 'home') {
    return (
      <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Logo />
        <p className='f3 link dim black pa3 pointer' onClick={() => onRouteChange('signin')}> Sign Out </p>
      </nav>
    )
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Logo />
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          { currentRoute === 'register' &&
            <p className='f3 link dim black pa3 pointer' onClick={() => onRouteChange('signin')}>Sign In</p>}
          { currentRoute === 'signin' &&
          <p className='f3 link dim black pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>}
        </div>
      </nav>
    )
  }
}

export default Navigation