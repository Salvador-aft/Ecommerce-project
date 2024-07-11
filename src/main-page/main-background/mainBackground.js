import React, { useState } from 'react';
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import './mainBackground.scss';
import RedShoes from '../main-image/components/red/redShoes';
import GreenShoes from '../main-image/components/green/greenShoes';
import BlackShoes from '../main-image/components/black/blackShoes';

const Container = styled(BootstrapContainer)`
`;

function MainPage() {
  const [activeShoes, setActiveShoes] = useState('red');
  const [exitingShoes, setExitingShoes] = useState(null);
  const [activeSize, setActiveSize] = useState(null);

  const handleSizeChange = (size) => {
    setActiveSize(activeSize === size ? null : size);
  };

  const handleShoesChange = (shoesColor) => {
    if (shoesColor !== activeShoes && exitingShoes === null) {
      setExitingShoes(activeShoes);
      setActiveShoes(shoesColor);
    }
  };

  const handleExitComplete = () => {
    setExitingShoes(null);
  };

  const getColor = () => {
    switch (activeShoes) {
      case 'red':
        return 'red';
      case 'green':
        return 'green';
      case 'black':
        return 'black';
      default:
        return 'white';
    }
  };

  const Button = styled.button`
    color: white;
    width: 60px;
    height: 60px;
    margin-right: 5px;
    padding: 4px;
    text-align: center;
    background: none;
    border: 1px solid white;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
      background-color: white;
      color: ${getColor};
    }

    ${(props) =>
      props.active &&
      css`
        background-color: white;
        color: ${getColor};
      `}
  `;

  const CustomListContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style-type: none;

    ${(props) =>
      props.first &&
      css`
        margin-top: 0;
      `}
    ${(props) =>
      props.last &&
      css`
        margin-top: 5px;
        margin-bottom: 10px;
      `}
  `;

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
              <div className="pb-3">
                <h2 className="pb-2">JORDAN 1 {activeShoes.toUpperCase()}</h2>
                <h4>Release Date</h4>
                <h6 className="pb-2">2023-08-18</h6>
                <h4>Price</h4>
                <h6>$220</h6>
              </div>
              <div className="size-select pb-3">
                <div>
                  <h4>Select Size</h4>
                </div>
                <div>
                  <CustomListContainer first>
                    <li>
                      <Button
                        active={activeSize === '8'}
                        onClick={() => handleSizeChange('8')}
                      >
                        8
                      </Button>
                    </li>
                    <li>
                      <Button
                        active={activeSize === '8.5'}
                        onClick={() => handleSizeChange('8.5')}
                      >
                        8.5
                      </Button>
                    </li>
                    <li>
                      <Button
                        active={activeSize === '9'}
                        onClick={() => handleSizeChange('9')}
                      >
                        9
                      </Button>
                    </li>
                    <li>
                      <Button
                        active={activeSize === '9.5'}
                        onClick={() => handleSizeChange('9.5')}
                      >
                        9.5
                      </Button>
                    </li>
                    <li>
                      <Button
                        active={activeSize === '10'}
                        onClick={() => handleSizeChange('10')}
                      >
                        10
                      </Button>
                    </li>
                  </CustomListContainer>
                  <CustomListContainer last>
                    <li>
                      <Button
                        active={activeSize === '10.5'}
                        onClick={() => handleSizeChange('10.5')}
                      >
                        10.5
                      </Button>
                    </li>
                    <li>
                      <Button
                        active={activeSize === '11'}
                        onClick={() => handleSizeChange('11')}
                      >
                        11
                      </Button>
                    </li>
                    <li>
                      <Button
                        active={activeSize === '11.5'}
                        onClick={() => handleSizeChange('11.5')}
                      >
                        11.5
                      </Button>
                    </li>
                    <li>
                      <Button
                        active={activeSize === '12'}
                        onClick={() => handleSizeChange('12')}
                      >
                        12
                      </Button>
                    </li>
                    <li>
                      <Button
                        active={activeSize === '12.5'}
                        onClick={() => handleSizeChange('12.5')}
                      >
                        12.5
                      </Button>
                    </li>
                  </CustomListContainer>
                </div>
              </div>
              <div>
                <div>
                  <h4>Select Color</h4>
                </div>
                <div className="buttons-wrapper d-flex">
                  <button
                    className={`red ${
                      activeShoes === 'red' && exitingShoes === null
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => handleShoesChange('red')}
                  ></button>
                  <button
                    className={`green ${
                      activeShoes === 'green' && exitingShoes === null
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => handleShoesChange('green')}
                  ></button>
                  <button
                    className={`black ${
                      activeShoes === 'black' && exitingShoes === null
                        ? 'active'
                        : ''
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
            <div className="text-white mb-4 text-explain">
              <h5>
                The first Air Jordan Shoe Was Produced For Basketball Player
                Michael Jordan During His Time With The Chicago Bulls On
                November 17, 1984 And Released To The Public On April 1, 1985
              </h5>
            </div>
            <div className="d-flex">
              <div className="border-arrow">
                <div className="arrow-left"></div>
              </div>
              <div className="border-arrow">
                <div className="arrow-right"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;
