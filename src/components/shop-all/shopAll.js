import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Filter from './components/filters';
import SneakerList from './components/sneakers-list/sneakersList';

const ContentContainer = styled.div`
  margin-top: 80px; // Adjust this value based on the menu height
  padding: 20px;
`;

const FilterColumn = styled(Col)`
  width: 250px;
  max-width: 250px;
  min-width: 250px;
`;

const ShopAll = () => {
  const location = useLocation(); // Hook to get the current location of the URL
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [filters, setFilters] = useState({
    gender: null,
    style: null,
    opportunities: null,
    size: null,
    shoeSize: null,
    color: null,
  });

  // Update filter state from URL when the component loads
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);  // Parse the URL query parameters
    const newFilters = {
      gender: queryParams.get('gender') || null,
      style: queryParams.get('style') || null,
      opportunities: queryParams.get('opportunities') || null,
      size: queryParams.get('size') || null,
      shoeSize: queryParams.get('shoeSize') || null,
      color: queryParams.get('color') || null,
    };
    setFilters(newFilters);  // Set the filters from the URL
  }, [location.search]);  // Re-run when URL parameters change

  // Function to handle filter changes
  const handleFilterChange = (newFilter) => {
    const updatedFilters = { ...filters, ...newFilter }; // Combine current filters with the new ones
    setFilters(updatedFilters);  // Update the filter state

    // Create and update the URL with the applied filters
    const queryParams = new URLSearchParams(updatedFilters);  // Convert the filters to URL parameters
    navigate(`${location.pathname}?${queryParams.toString()}`);  // Update the URL with the new filters
  };

  return (
    <ContentContainer>
      <h6>Home / Nike</h6>
      <h3>Nike</h3>
      <Row className="h-100">
        <FilterColumn>
          <Filter selectedFilters={filters} onFilterChange={handleFilterChange} />
        </FilterColumn>
        <Col xs={10} sm={10} md={10} lg={10}>
          <SneakerList filters={filters} />
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default ShopAll;