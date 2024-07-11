import React from 'react';
import styled from 'styled-components';
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import Filter from './components/filters'

const ContentContainer = styled.div`
  margin-top: 80px; // Ajusta este valor según la altura del menú
  padding: 20px;
`;

const NewReleases = () => {
  return (
    <ContentContainer>
      <h6>Home / Nike</h6>
      <h3>Nike</h3>
      <Row className="h-100">
        <Col xs={2} sm={2} md={2} lg={2} >
        <Filter />
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} >
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default NewReleases;