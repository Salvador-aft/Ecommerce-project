import React from 'react';
import styled from 'styled-components';
import { Container as BootstrapContainer, Row, Col as BootstrapCol } from 'react-bootstrap';

const DetailsContainer = styled(BootstrapContainer)`
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  padding-bottom: 0.5rem;

  @media (max-width: 1400px) {
    font-size: 1.75rem;
  }

  @media (max-width: 1200px) {
    font-size: 1.5rem;
  }

  @media (max-width: 992px) {
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 576px) {
    font-size: 0.875rem;
  }

  @media (max-width: 400px) {
    font-size: 0.75rem;
  }
`;

const Subtitle = styled.h4`
  margin-bottom: 0.25rem;

  @media (max-width: 1400px) {
    font-size: 1.5rem;
  }

  @media (max-width: 1200px) {
    font-size: 1.25rem;
  }

  @media (max-width: 992px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 576px) {
    font-size: 0.75rem;
  }

  @media (max-width: 400px) {
    font-size: 0.625rem;
  }
`;

const InfoText = styled.h6`
  padding-bottom: 0.5rem;

  @media (max-width: 1400px) {
    font-size: 1.25rem;
  }

  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 992px) {
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 576px) {
    font-size: 0.625rem;
  }

  @media (max-width: 400px) {
    font-size: 0.5rem;
  }
`;

const Col = styled(BootstrapCol)`
  padding: 0 !important;
`;

const ProductDetails = ({ activeShoes }) => (
  <DetailsContainer fluid>
    <Row>
      <Col>
        <Title>JORDAN 1 {activeShoes.toUpperCase()}</Title>
        <Subtitle>Release Date</Subtitle>
        <InfoText>2023-08-18</InfoText>
        <Subtitle>Price</Subtitle>
        <InfoText>$220</InfoText>
      </Col>
    </Row>
  </DetailsContainer>
);

export default ProductDetails;