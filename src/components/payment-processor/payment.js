import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const PaymentComponent = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [sneaker, setSneaker] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch sneaker details when the component is mounted
  useEffect(() => {
    const fetchSneaker = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/sneakers/${id}`);
        const fetchedSneaker = response.data;

        // Set the default color if available
        if (fetchedSneaker.color && fetchedSneaker.color.length > 0) {
          setSelectedColor(fetchedSneaker.color[0]);
        }

        setSneaker(fetchedSneaker);
      } catch (err) {
        console.error('Error fetching sneaker data:', err);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSneaker();
  }, [id]);

  // Log changes in selected color or quantity
  useEffect(() => {
    console.log('Current request details:', {
      selectedColor,
      quantity,
    });
  }, [selectedColor, quantity]);

  // Handle payment initiation
  const handleProceedToPayment = async () => {
    setLoading(true);
    setError('');
    try {
      // Ensure the user is logged in
      if (!user || !user.id) {
        setError('User not logged in. Please log in to continue.');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      // Log the data being sent to the backend
      console.log('Data sent to backend from PaymentComponent:', {
        id,
        quantity,
        color: selectedColor,
        userId: user?.id,
      });

      const response = await axios.post(
        `http://localhost:5000/mercadoPago/${id}/payment`,
        { quantity, userId: user.id, color: selectedColor },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { init_point } = response.data;
      if (!init_point) {
        throw new Error('Payment initiation failed.');
      }

      // Redirect the user to the payment URL
      window.location.href = init_point;
    } catch (err) {
      console.error('Error creating payment:', err);
      setError('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate the total price
  const totalPrice = sneaker ? sneaker.price * quantity : 0;

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sneaker ? (
        <div>
          <h1>Payment for {sneaker.name}</h1>
          {selectedColor && sneaker.image_url && sneaker.image_url[selectedColor] && (
            <img
              src={sneaker.image_url[selectedColor]}
              alt={`${sneaker.name} - ${selectedColor}`}
              style={{ width: '300px', height: 'auto' }}
            />
          )}
          <p>Price: ${sneaker.price}</p>
          <p>Selected Color: {selectedColor}</p>
          <div>
            <label htmlFor="color-select">Select color:</label>
            <select
              id="color-select"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {sneaker.color.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity-select">Quantity:</label>
            <input
              id="quantity-select"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default PaymentComponent;