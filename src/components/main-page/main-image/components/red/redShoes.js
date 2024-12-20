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
  // El estado `currentState` controla la animación: 'active' (en el centro) o 'inactive' (fuera de la pantalla).
  const [currentState, setCurrentState] = useState(isActive ? 'active' : 'inactive');

  useEffect(() => {
    // Cambia el estado según `isActive` para determinar la animación.
    if (isActive) {
      setCurrentState('active');
    } else {
      setCurrentState('inactive');
      // Usa un temporizador para llamar a `onExitComplete` cuando termine la animación (1 segundo).
      const timer = setTimeout(() => {
        onExitComplete();
      }, 1000); // Asegúrate de que este tiempo coincida con la duración de la animación.
      // Limpia el temporizador si el componente se desmonta antes de que termine.
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
  width: 600px;
  height: auto;
  padding-bottom: 100px;

  /* Media queries for responsiveness */
  @media (max-width: 1400px) { /* xxl */
    width: 550px;
  }

  @media (max-width: 1200px) { /* xl */
    width: 500px;
  }

  @media (max-width: 992px) { /* lg */
    width: 450px;
  }

  @media (max-width: 768px) { /* md */
    width: 400px;
  }

  @media (max-width: 576px) { /* sm */
    width: 350px;
  }

  @media (max-width: 375px) { /* xs */
    width: 300px;
  }
`;

export default RedShoes;