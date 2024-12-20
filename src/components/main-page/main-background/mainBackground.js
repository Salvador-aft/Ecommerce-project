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
`;

function MainPage() {
  const [activeShoes, setActiveShoes] = useState('red');
  const [exitingShoes, setExitingShoes] = useState(null);
  const [activeSize, setActiveSize] = useState(null);

  // Handles the selection of a shoe size.
  // If the currently selected size is clicked again, it deselects it.
  const handleSizeChange = (size) => {
    setActiveSize(activeSize === size ? null : size);
  };

  // Handles switching between shoe colors.
  // Prevents switching if a transition (exitingShoes) is already in progress.
  const handleShoesChange = (shoesColor) => {
    if (shoesColor !== activeShoes && exitingShoes === null) {
      setExitingShoes(activeShoes); // Set the current active shoe as the exiting shoe
      setActiveShoes(shoesColor);  // Update the active shoe to the new color
    }
  };

  // Callback to reset the exiting shoe state once the transition is complete.
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
        <Row className="h-100 align-items-end mx-5">
          <Col xs={3} sm={3} md={3} lg={3} className="overflow-auto">
            <div className="buttons-container text-white">
              <ProductDetails activeShoes={activeShoes} />
              <SizeSelector activeSize={activeSize} handleSizeChange={handleSizeChange} />
              <div>
                <div>
                  <h4>Select Color</h4>
                </div>
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
            </div>
          </Col>
          <Col
            xs={6}
            sm={6}
            md={6}
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="shoe-image-container">
              <div className="background-text">NIKE</div>
              {activeShoes === 'red' && (
                <RedShoes
                  isActive={true}
                  onExitComplete={handleExitComplete}
                />
              )}
              {activeShoes === 'green' && (
                <GreenShoes
                  isActive={true}
                  onExitComplete={handleExitComplete}
                />
              )}
              {activeShoes === 'black' && (
                <BlackShoes
                  isActive={true}
                  onExitComplete={handleExitComplete}
                />
              )}
              {exitingShoes === 'red' && (
                <RedShoes
                  isActive={false}
                  onExitComplete={handleExitComplete}
                />
              )}
              {exitingShoes === 'green' && (
                <GreenShoes
                  isActive={false}
                  onExitComplete={handleExitComplete}
                />
              )}
              {exitingShoes === 'black' && (
                <BlackShoes
                  isActive={false}
                  onExitComplete={handleExitComplete}
                />
              )}
            </div>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <ExplanationText />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;