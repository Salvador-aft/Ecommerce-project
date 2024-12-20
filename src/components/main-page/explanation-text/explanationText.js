import React from 'react';
import styled from 'styled-components';
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';

const ExplanationContainer = styled(BootstrapContainer)`
  color: white;
  margin-bottom: 1.5rem;

  h5 {
    font-size: 1.25rem;
    line-height: 1.6;
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1400px) {
    h5 {
      font-size: 1.125rem;
    }
  }

  @media (max-width: 1200px) {
    h5 {
      font-size: 1rem;
    }
  }

  @media (max-width: 992px) {
    h5 {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 768px) {
    h5 {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 576px) {
    h5 {
      font-size: 0.625rem;
    }
  }

  @media (max-width: 400px) {
    h5 {
      font-size: 0.5rem;
    }
  }
`;

const BorderArrow = styled.div`
  width: 75px;
  height: 75px;
  display: flex;
  border: 2px white solid;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 20px;
  transition: border-color 0.3s;

  &:hover {
    border-color: rgba(201, 201, 198, 0.5);
  }

  .arrow-left,
  .arrow-right {
    transition: background-color 0.3s, border-color 0.3s;
  }

  .arrow-left {
    display: inline-block;
    position: relative;
    width: 75px;
    height: 1px;
    background-color: white;
  }

  .arrow-left::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0px;
    width: 16px;
    height: 16px;
    border-left: 2px solid white;
    border-top: 2px solid white;
    transform: translateY(-50%) rotate(-45deg);
  }

  .arrow-right {
    display: inline-block;
    position: relative;
    width: 75px;
    height: 1px;
    background-color: white;
  }

  .arrow-right::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0px;
    width: 16px;
    height: 16px;
    border-left: 2px solid white;
    border-top: 2px solid white;
    transform: translateY(-50%) rotate(135deg);
  }

  &:hover .arrow-left,
  &:hover .arrow-right {
    background-color: rgba(201, 201, 198, 0.5);
  }

  &:hover .arrow-left::before,
  &:hover .arrow-right::after {
    border-color: rgba(201, 201, 198, 0.5);
  }

  @media (max-width: 1400px) {
    width: 70px;
    height: 70px;

    .arrow-left,
    .arrow-right {
      width: 70px;
    }

    .arrow-left::before,
    .arrow-right::after {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 1200px) {
    width: 65px;
    height: 65px;

    .arrow-left,
    .arrow-right {
      width: 65px;
    }

    .arrow-left::before,
    .arrow-right::after {
      width: 12px;
      height: 12px;
    }
  }

  @media (max-width: 992px) {
    width: 60px;
    height: 60px;

    .arrow-left,
    .arrow-right {
      width: 60px;
    }

    .arrow-left::before,
    .arrow-right::after {
      width: 10px;
      height: 10px;
    }
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;

    .arrow-left,
    .arrow-right {
      width: 55px;
    }

    .arrow-left::before,
    .arrow-right::after {
      width: 8px;
      height: 8px;
    }
  }

  @media (max-width: 576px) {
    width: 50px;
    height: 50px;

    .arrow-left,
    .arrow-right {
      width: 50px;
    }

    .arrow-left::before,
    .arrow-right::after {
      width: 6px;
      height: 6px;
    }
  }

  @media (max-width: 400px) {
    width: 45px;
    height: 45px;

    .arrow-left,
    .arrow-right {
      width: 45px;
    }

    .arrow-left::before,
    .arrow-right::after {
      width: 4px;
      height: 4px;
    }
  }
`;

const ExplanationText = () => (
  <ExplanationContainer fluid>
    <Row>
      <Col>
        <h5>
          The first Air Jordan Shoe Was Produced For Basketball Player Michael Jordan
          During His Time With The Chicago Bulls On November 17, 1984 And Released To
          The Public On April 1, 1985
        </h5>
      </Col>
    </Row>
    <Row className="d-flex">
      <Col xs="auto">
        <BorderArrow>
          <div className="arrow-left"></div>
        </BorderArrow>
      </Col>
      <Col xs="auto">
        <BorderArrow>
          <div className="arrow-right"></div>
        </BorderArrow>
      </Col>
    </Row>
  </ExplanationContainer>
);

export default ExplanationText;