import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxSet }) => {
  return (
    <div className='center ma'>
        <div className='absolute mt2'>
            <img id='image' src={imageUrl} alt='' width='500' height='auto'/>
            { Object.values(boxSet).map(box => {
              return <div className='bounding_box' style={{top:box.topRow, bottom:box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
            })}
        </div>
    </div>
  );
}

export default FaceRecognition;