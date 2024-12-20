import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import GreenShoesImage from '../../images/green-shoes.png';

const moveToCenter = keyframes`
  from {
    left: 120%;
  }
  to {
    left: 50%;
  }
`;

const moveToLeft = keyframes`
  from {
    left: 50%;
  }
  to {
    left: -20%;
  }
`;

// This component displays a shoe image that animates between two positions on the screen 
// (center and off-screen to the left) based on its `isActive` state.

const GreenShoes = ({ isActive, onExitComplete }) => {
  // `currentState` determines the animation state: 'active' (center) or 'inactive' (off-screen).
  const [currentState, setCurrentState] = useState(isActive ? 'active' : 'inactive');

  useEffect(() => {
    // When `isActive` is true, set the state to 'active' to animate the shoe to the center.
    if (isActive) {
      setCurrentState('active');
    } else {
      // When `isActive` is false, set the state to 'inactive' and trigger the exit animation.
      setCurrentState('inactive');
      // A timer ensures `onExitComplete` is called after the animation ends (1 second).
      const timer = setTimeout(() => {
        onExitComplete();
      }, 1000); // Ensure the timer duration matches the animation duration
      // Cleanup the timer if the component unmounts before the timeout completes.
      return () => clearTimeout(timer);
    }
  }, [isActive, onExitComplete]);

  return (
    <ShoeContainer currentState={currentState}>
      <Image src={GreenShoesImage} alt="Green Shoes" />
    </ShoeContainer>
  );
};

const ShoeContainer = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.currentState === 'active' ? '50%' : '-20%')};
  transform: translate(-50%, -50%);
  animation: ${(props) =>
    props.currentState === 'active'
      ? css`
          ${moveToCenter} 1s ease-in-out forwards
        `
      : css`
          ${moveToLeft} 1s ease-in-out forwards
        `};
`;

const Image = styled.img`
  width: 600px;
  height: auto;
  padding-bottom: 100px;

  @media (max-width: 1400px) {
    width: 550px;
  }

  @media (max-width: 1200px) {
    width: 500px;
  }

  @media (max-width: 992px) {
    width: 450px;
  }

  @media (max-width: 768px) {
    width: 400px;
  }

  @media (max-width: 576px) {
    width: 350px;
  }

  @media (max-width: 375px) {
    width: 300px;
  }
`;

export default GreenShoes;