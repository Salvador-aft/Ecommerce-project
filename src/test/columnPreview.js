import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ColumnPreview = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={6} md={1} lg={1} style={{ border: '1px solid black', padding: '10px' }}>
          Column 1
        </Col>
        <Col xs={12} sm={6} md={2} lg={2} style={{ border: '1px solid black', padding: '10px' }}>
          Column 2
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} style={{ border: '1px solid black', padding: '10px' }}>
          Column 3
        </Col>
        <Col xs={12} sm={6} md={2} lg={2} style={{ border: '1px solid black', padding: '10px' }}>
          Column 4
        </Col>
        <Col xs={12} sm={6} md={3} lg={2} style={{ border: '1px solid black', padding: '10px' }}>
          Column 5
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} style={{ border: '1px solid black', padding: '10px' }}>
          Column 6
        </Col>
        <Col xs={12} sm={6} md={4} lg={1} style={{ border: '1px solid black', padding: '10px' }}>
          Column 7
        </Col>
      </Row>
    </Container>
  );
};

export default ColumnPreview;