import React from 'react';
import styled, { css } from 'styled-components';

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
  font-size: 1rem;

  // Change background and text color on hover. The color is dynamically controlled using props.
  &:hover {
    background-color: white;
    color: ${(props) => props.color};
  }

  // Apply specific styles if the 'active' prop is true
  ${(props) =>
    props.active &&
    css`
      background-color: white;
      color: ${(props) => props.color};
    `}

  @media (max-width: 1400px) {
    width: 40px;
    height: 40px;
    font-size: 0.85rem;
  }

  @media (max-width: 1200px) {
    width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }

  @media (max-width: 992px) {
    width: 30px;
    height: 30px;
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    font-size: 0.7rem;
  }

  @media (max-width: 576px) {
    width: 20px;
    height: 20px;
    font-size: 0.65rem;
  }

  @media (max-width: 400px) {
    width: 20px;
    height: 20px;
    font-size: 0.65rem;
  }
`;

const CustomListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style-type: none;

  // Apply additional styles if the 'first' prop is true
  ${(props) =>
    props.first &&
    css`
      margin-top: 0;
    `}

  // Apply additional styles if the 'last' prop is true
  ${(props) =>
    props.last &&
    css`
      margin-top: 5px;
      margin-bottom: 10px;
    `}
`;

const SizeSelectWrapper = styled.div`
  padding-bottom: 3rem;
`;

const Header = styled.div`
  h4 {
    margin: 0;
  }
`;

const SizeSelector = ({ activeSize, handleSizeChange }) => (
  <SizeSelectWrapper>
    <Header>
      <h4>Select Size</h4>
    </Header>
    <div>
      <CustomListContainer first>
        <li>
          <Button active={activeSize === '8'} onClick={() => handleSizeChange('8')}>
            8
          </Button>
        </li>
        <li>
          <Button active={activeSize === '8.5'} onClick={() => handleSizeChange('8.5')}>
            8.5
          </Button>
        </li>
        <li>
          <Button active={activeSize === '9'} onClick={() => handleSizeChange('9')}>
            9
          </Button>
        </li>
        <li>
          <Button active={activeSize === '9.5'} onClick={() => handleSizeChange('9.5')}>
            9.5
          </Button>
        </li>
        <li>
          <Button active={activeSize === '10'} onClick={() => handleSizeChange('10')}>
            10
          </Button>
        </li>
      </CustomListContainer>
      <CustomListContainer last>
        <li>
          <Button active={activeSize === '10.5'} onClick={() => handleSizeChange('10.5')}>
            10.5
          </Button>
        </li>
        <li>
          <Button active={activeSize === '11'} onClick={() => handleSizeChange('11')}>
            11
          </Button>
        </li>
        <li>
          <Button active={activeSize === '11.5'} onClick={() => handleSizeChange('11.5')}>
            11.5
          </Button>
        </li>
        <li>
          <Button active={activeSize === '12'} onClick={() => handleSizeChange('12')}>
            12
          </Button>
        </li>
        <li>
          <Button active={activeSize === '12.5'} onClick={() => handleSizeChange('12.5')}>
            12.5
          </Button>
        </li>
      </CustomListContainer>
    </div>
  </SizeSelectWrapper>
);

export default SizeSelector;