import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../../../context/authContext';

const SneakerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const SneakerCard = styled.div`
  width: 45%;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const SneakerImage = styled.img`
  width: 100%;
  height: auto;
`;

const BuyButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const SneakerList = ({ filters }) => {
  const { isAuthenticated, user } = useAuth();
  const [sneakers, setSneakers] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const navigate = useNavigate();

  // Fetch sneakers from the backend whenever filters change.
  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sneakers/filter', { params: filters });
        setSneakers(response.data);

        // Initialize default selected color for each sneaker.
        const defaultColors = {};
        response.data.forEach((sneaker) => {
          const availableColors = sneaker.image_url;
          defaultColors[sneaker.id] = Object.keys(availableColors)[0];
        });
        setSelectedColors(defaultColors);
      } catch (error) {
        console.error('Error fetching sneakers:', error);
        alert('Error fetching sneakers. Please try again later.');
      }
    };

    fetchSneakers();
  }, [filters]);

  // Updates the selected color for a specific sneaker.
  const handleColorChange = (sneakerId, color) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [sneakerId]: color,
    }));
  };

  // Handles the purchase flow based on authentication status.
  const handleBuy = (sneaker) => {
    if (isAuthenticated) {
      navigate(`/payment/${sneaker.id}`, { state: { email: user.email } });
    } else {
      alert('Please log in before purchasing');
      navigate('/signin');
    }
  };

  return (
    <div>
      <h1>Sneaker Collection</h1>
      <SneakerContainer>
        {sneakers.length > 0 ? (
          sneakers.map((sneaker) => {
            const selectedColor = selectedColors[sneaker.id];
            const imageUrl = sneaker.image_url[selectedColor];
            const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`;
            const colorOptions = Object.keys(sneaker.image_url);

            return (
              <SneakerCard key={sneaker.id}>
                <h2>{sneaker.name}</h2>
                <SneakerImage
                  src={fullImageUrl}
                  alt={`${sneaker.name} - ${selectedColor}`}
                  onError={(e) => e.target.src = '/assets/placeholder.png'}
                />
                <p>Price: ${sneaker.price}</p>

                {colorOptions.length > 1 && (
                  <div>
                    <label htmlFor={`color-select-${sneaker.id}`}>Select color:</label>
                    <select
                      id={`color-select-${sneaker.id}`}
                      value={selectedColor}
                      onChange={(e) => handleColorChange(sneaker.id, e.target.value)}
                    >
                      {colorOptions.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <p>Selected Color: {selectedColor}</p>
                <BuyButton onClick={() => handleBuy(sneaker)}>Buy</BuyButton>
              </SneakerCard>
            );
          })
        ) : (
          <p>No sneakers available to render</p>
        )}
      </SneakerContainer>
    </div>
  );
};

export default SneakerList;