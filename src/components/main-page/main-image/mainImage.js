import React, { useState } from 'react';
import RedShoes from './components/red/redShoes';
import GreenShoes from './components/green/greenShoes';
import BlackShoes from './components/black/blackShoes';
import './mainImage.scss';

function MainImage() {
  const [currentState, setCurrentState] = useState('state1');

  return (
    <div className="main-image-container">
      {currentState === 'state1' && <RedShoes state={currentState} />}
      {currentState === 'state2' && <GreenShoes state={currentState} />}
      {currentState === 'state3' && <BlackShoes state={currentState} />}
      <div className="button-container">
        <button onClick={() => setCurrentState('state1')} className={`button ${currentState === 'state1' ? 'active' : ''}`}>Red</button>
        <button onClick={() => setCurrentState('state2')} className={`button ${currentState === 'state2' ? 'active' : ''}`}>Green</button>
        <button onClick={() => setCurrentState('state3')} className={`button ${currentState === 'state3' ? 'active' : ''}`}>Black</button>
      </div>
    </div>
  );
}

export default MainImage;