import React from 'react';
import Logo from './logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'space-between'}}>
                <Logo />
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}> Sign Out </p>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'space-between'}}>
                <Logo />
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign In</p>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
                </div>
            </nav>
        )
    }
}

export default Navigation