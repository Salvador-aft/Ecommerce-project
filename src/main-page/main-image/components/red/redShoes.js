import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import RedShoesImage from '../../images/red-shoes.png';

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

const RedShoes = ({ isActive, onExitComplete }) => {
  const [currentState, setCurrentState] = useState(isActive ? 'active' : 'inactive');

  useEffect(() => {
    if (isActive) {
      setCurrentState('active');
    } else {
      setCurrentState('inactive');
      const timer = setTimeout(() => {
        onExitComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onExitComplete]);

  return (
    <ShoeContainer currentState={currentState}>
      <Image src={RedShoesImage} alt="Red Shoes" />
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
  width: 800px;
  height: auto;
  padding-bottom: 100px
`;

export default RedShoes;
