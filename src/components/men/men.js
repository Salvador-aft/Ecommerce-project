import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import pegasusAd from '../assets/man-images/pegasus-ad.png';
import sportAd from '../assets/man-images/sport-ad.png';
import urbanAd from '../assets/man-images/urban-ad.png';
import communityImg from '../assets/all-images/community.jpg';
import '../assets/font/Anton-Regular.ttf';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100vw;
`;

const PegasusImage = styled.img`
  width: 90%;
  max-width: 100%;
  margin: 0 auto 20px auto;
`;

const Title = styled.h1`
  font-family: 'Anton', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  font-family: sans-serif;
  margin-bottom: 20px;
`;

const ShopButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-bottom: 40px;
`;

const ImageGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5%;
  margin-bottom: 40px;
  padding: 0;
  overflow-x: hidden;
`;

const ImageContainer = styled.div`
  width: 45%;
  margin: 0;
  cursor: pointer;
`;

const SmallText = styled.p`
  font-size: 1.2rem;
  font-family: sans-serif;
  margin-top: 10px;
`;

const CommunityImage = styled.img`
  width: 90%;
  max-width: 100%;
`;

const Men = () => {
  const navigate = useNavigate(); // Hook from react-router-dom to programmatically navigate between routes.

  // Function to construct a URL with query parameters for filtering
  const handleNavigateWithFilters = (path, filters) => {
    const queryParams = new URLSearchParams(filters).toString(); // Converts the filters object into a query string.
    navigate(`${path}?${queryParams}`); // Navigates to the specified path with the query parameters appended.
  };
  
  return (
    <Container>
      <PegasusImage src={pegasusAd} alt="Pegasus Ad" />
      
      <Title>UNLEASH YOUR ENERGY</Title>
      <Description>
        Run with Pegasus. Feel the reactivity and energy return of ReactX foam and Air Zoom technology.
      </Description>
      <ShopButton>Shop Now</ShopButton>

      <ImageGrid>
        <ImageContainer onClick={() => handleNavigateWithFilters('/LastReleases', { gender: 'Man', style: 'Urban' })}>
          <img src={urbanAd} alt="Urban Ad" style={{ width: '95%' }} />
          <SmallText>Urban</SmallText>
        </ImageContainer>
        <ImageContainer onClick={() => handleNavigateWithFilters('/LastReleases', { gender: 'Man', style: 'Sport' })}>
          <img src={sportAd} alt="Sport Ad" style={{ width: '95%' }} />
          <SmallText>Sport</SmallText>
        </ImageContainer>
      </ImageGrid>

      <CommunityImage src={communityImg} alt="Community" onClick={() => navigate('/signup')} />
    </Container>
  );
};

export default Men;