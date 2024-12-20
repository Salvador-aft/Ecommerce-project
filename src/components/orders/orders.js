import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// Estilos
const OrdersContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 80px auto 0;
  font-family: Arial, sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
`;

const OrderCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #f9f9f9;
`;

const OrderImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const OrderDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;

  h3 {
    margin: 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #555;
  }
`;

const StatusBadge = styled.span`
  background-color: ${({ $status }) =>
    $status === 'Completed' ? '#4caf50' : $status === 'Pending' ? '#ff9800' : '#f44336'};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
`;

const Orders = () => {
  const location = useLocation();
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState(null);
  const [error, setError] = useState('');

  const placeholderImage = '/assets/placeholder.png';

  const getImageForOrder = (imageUrls, color) => {
    if (imageUrls && color) {
      const url = imageUrls[color];
      return url ? (url.startsWith('http') ? url : `http://localhost:5000${url}`) : placeholderImage;
    }
    return placeholderImage;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('payment_id');
    const sneakerId = params.get('sneaker_id');
    const quantity = params.get('quantity');
    const color = params.get('color');

    if (!token) {
      setError('Token not found. Unauthorized access.');
      return;
    }

    if (!paymentId || !sneakerId || !quantity || !color) {
      console.warn('Missing parameters for order creation:', { paymentId, sneakerId, quantity, color });
      return;
    }

    const processOrder = async () => {
      try {
        console.log('Sending order creation request...');
        const createResponse = await axios.post(
          'http://localhost:5000/orders',
          { payment_id: paymentId, sneaker_id: sneakerId, quantity, color },
          { headers: { Authorization: `Bearer ${token}` } }
        );
    
        console.log('Order creation response:', createResponse.data);
    
        if (!createResponse.data) {
          console.error('No data returned from order creation API');
          return;
        }
    
        // Actualizar directamente la lista de órdenes
        setOrders((prevOrders) => [createResponse.data, ...prevOrders]);
        setNewOrder(createResponse.data);
      } catch (err) {
        console.error('Error processing order:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Failed to process order.');
      }
    };    

    processOrder();
  }, [location.search, token]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError('Token not found. Unauthorized access.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        console.log('Orders fetched:', response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders.');
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <OrdersContainer>
      <SectionTitle>My Orders</SectionTitle>
      {orders.length > 0 ? (
  orders
    .filter(order => order !== null) // Ignorar órdenes nulas
    .map((order, index) => {
      console.log(`Processing order at index ${index}:`, order);
      const sneaker = order.Sneaker || {}; // Proporciona un objeto vacío si no hay datos de Sneaker
      const imageUrl = getImageForOrder(sneaker.image_url, order.color);

      return (
        <OrderCard key={order.id}>
          <OrderImage
            src={imageUrl}
            alt={sneaker.name || 'Sneaker Image'}
          />
          <OrderDetails>
            <h3>{sneaker.name || 'Unknown Sneaker'}</h3>
            <p>Color: {order.color || 'Not specified'}</p>
            <p>Quantity: {order.quantity || 0}</p>
            <p>Price: ${sneaker.price ? parseFloat(sneaker.price).toFixed(2) : 'N/A'}</p>
            <p>
              Ordered on:{' '}
              {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Unknown Date'}
            </p>
            <StatusBadge $status={order.status || 'Pending'}>
              {order.status || 'Unknown'}
            </StatusBadge>
          </OrderDetails>
        </OrderCard>
      );
    })
) : (
  <p>No orders found.</p>
)}
    </OrdersContainer>
  );
};

export default Orders;