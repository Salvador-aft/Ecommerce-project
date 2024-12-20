import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import legoCollab from '../assets/kids-images/Lego-Collab.png';
import kidsUrban from '../assets/kids-images/kids-urban.jpg';
import kidsSport from '../assets/kids-images/kids-sport.jpg';
import '../assets/font/Anton-Regular.ttf';
import communityImg from '../assets/all-images/community.jpg';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100vw;
`;

const MainImage = styled.img`
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

  &:hover {
    background-color: #42261a;
  }
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

const Kids = () => {
  const navigate = useNavigate();

  // Function to navigate to another path with query parameters (filters)
  const handleNavigateWithFilters = (path, filters) => {
    // Convert the filters object into a query string
    const queryParams = new URLSearchParams(filters).toString();
    // Navigate to the new path with the query parameters (filters)
    navigate(`${path}?${queryParams}`);
  };

  return (
    <Container>
      <MainImage src={legoCollab} alt="Lego Collaboration Ad" />
      <Title>FUN WITH EVERY STEP</Title>
      <Description>
        Explore the new collection in collaboration with LEGO, designed for active kids with imagination!
      </Description>
      <ShopButton>Shop Now</ShopButton>
      <ImageGrid>
        <ImageContainer onClick={() => handleNavigateWithFilters('/LastReleases', { gender: 'Kids', style: 'Urban' })}>
          <img src={kidsUrban} alt="Kids Urban Ad" style={{ width: '95%' }} />
          <SmallText>Urban</SmallText>
        </ImageContainer>
        <ImageContainer onClick={() => handleNavigateWithFilters('/LastReleases', { gender: 'Kids', style: 'Sport' })}>
          <img src={kidsSport} alt="Kids Sport Ad" style={{ width: '95%' }} />
          <SmallText>Sport</SmallText>
        </ImageContainer>
      </ImageGrid>
      <CommunityImage src={communityImg} alt="Community" onClick={() => navigate('/signup')} />
    </Container>
  );
};

export default Kids;