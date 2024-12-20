import React, { useState } from 'react';
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import './mainBackground.scss';
import RedShoes from '../main-image/components/red/redShoes';
import GreenShoes from '../main-image/components/green/greenShoes';
import BlackShoes from '../main-image/components/black/blackShoes';
import ExplanationText from '../explanation-text/explanationText';
import ProductDetails from '../product-detail/productDetails';
import SizeSelector from '../size-selector/sizeSelector';

const Container = styled(BootstrapContainer)`
  height: 100%;
  overflow: auto;
`;

const ResponsiveRow = styled(Row)`
  height: 100%;
  align-items: end;
`;

const DetailsCol = styled(Col)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ShoeImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ExplanationCol = styled(Col)`
  width: 100%;
  text-align: center;
  margin-top: 1rem;

`;

function MobileMainPage() {
  const [activeShoes, setActiveShoes] = useState('red');
  const [exitingShoes, setExitingShoes] = useState(null);
  const [activeSize, setActiveSize] = useState(null);

  // Handles the selection of a shoe size.
  // If the size clicked is already selected, it deselects it.
  const handleSizeChange = (size) => {
    setActiveSize(activeSize === size ? null : size);
  };

  // Handles switching between shoe colors.
  // Prevents switching while an exit animation is in progress.
  const handleShoesChange = (shoesColor) => {
    if (shoesColor !== activeShoes && exitingShoes === null) {
      setExitingShoes(activeShoes); // Marks the current shoe as exiting
      setActiveShoes(shoesColor);  // Updates the active shoe to the new color
    }
  };

  // Resets the exiting shoe state after the exit animation completes.
  const handleExitComplete = () => {
    setExitingShoes(null);
  };

  return (
    <div
      className={`background-container background-state-${
        activeShoes === 'red' ? '1' : activeShoes === 'green' ? '2' : '3'
      }`}
    >
      <Container fluid className="h-100">
        <ResponsiveRow className="mx-5">
          <DetailsCol xs={12} md={3}>
            <ProductDetails activeShoes={activeShoes} />
          </DetailsCol>
          <DetailsCol xs={12} md={3}>
            <SizeSelector activeSize={activeSize} handleSizeChange={handleSizeChange} />
          </DetailsCol>
          <DetailsCol xs={12} md={3}>
            <div>
              <h4>Select Color</h4>
              <div className="buttons-wrapper d-flex">
                <button
                  className={`red ${
                    activeShoes === 'red' && exitingShoes === null ? 'active' : ''
                  }`}
                  onClick={() => handleShoesChange('red')}
                ></button>
                <button
                  className={`green ${
                    activeShoes === 'green' && exitingShoes === null ? 'active' : ''
                  }`}
                  onClick={() => handleShoesChange('green')}
                ></button>
                <button
                  className={`black ${
                    activeShoes === 'black' && exitingShoes === null ? 'active' : ''
                  }`}
                  onClick={() => handleShoesChange('black')}
                ></button>
              </div>
            </div>
          </DetailsCol>
        </ResponsiveRow>
        <Row className="justify-content-center">
          <Col xs={12} className="d-flex justify-content-center align-items-center">
            <ShoeImageContainer className="shoe-image-container">
              <div className="background-text">NIKE</div>
              {activeShoes === 'red' && (
                <RedShoes isActive={true} onExitComplete={handleExitComplete} />
              )}
              {activeShoes === 'green' && (
                <GreenShoes isActive={true} onExitComplete={handleExitComplete} />
              )}
              {activeShoes === 'black' && (
                <BlackShoes isActive={true} onExitComplete={handleExitComplete} />
              )}
              {exitingShoes === 'red' && (
                <RedShoes isActive={false} onExitComplete={handleExitComplete} />
              )}
              {exitingShoes === 'green' && (
                <GreenShoes isActive={false} onExitComplete={handleExitComplete} />
              )}
              {exitingShoes === 'black' && (
                <BlackShoes isActive={false} onExitComplete={handleExitComplete} />
              )}
            </ShoeImageContainer>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <ExplanationCol xs={12}>
            <ExplanationText />
          </ExplanationCol>
        </Row>
      </Container>
    </div>
  );
}

export default MobileMainPage;