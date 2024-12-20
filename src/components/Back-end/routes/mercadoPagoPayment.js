const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference } = require('mercadopago');
const Order = require('../models/order');
const { verifyUser } = require('../../middleware/authenticateToken');
const Sneaker = require('../models/sneaker');
const User = require('../models/user');
const { createOrder } = require('../services/orderService');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// MercadoPago client setup using the access token from environment variables
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const preference = new Preference(client);
const paymentDataCache = {}; // Temporary in-memory cache to store payment data

// POST route to handle the creation of a payment session
router.post('/:id/payment', async (req, res) => {
  const { id } = req.params; // Sneaker ID from the route parameter
  const { quantity, userId, color } = req.body; // Extract quantity, userId, and color from request body

  // Validate that all necessary data (ID, quantity, userId, color) is present
  if (!id || !quantity || !userId || !color) {
    return res.status(400).json({ error: "Missing required data or color" });
  }

  try {
    // Fetch sneaker and user data from the database
    const product = await Sneaker.findByPk(id);
    const user = await User.findByPk(userId);

    // Check if the sneaker or user doesn't exist
    if (!product || !user) {
      return res.status(404).json({ error: "Product or user not found" });
    }

    // Create a payment preference with the sneaker details and user information
    const preferenceData = {
      items: [
        {
          id: product.id.toString(),
          title: `${product.name} (${color})`,
          currency_id: 'ARS',
          unit_price: parseFloat(product.price),
          quantity: quantity,
        },
      ],
      payer: { email: user.email },
      back_urls: {
        // Redirect URLs based on the payment status (success, failure, or pending)
        success: `http://localhost:5000/mercadoPago/payment-success?token=${req.headers.authorization.split(' ')[1]}&sneaker_id=${id}&quantity=${quantity}&color=${color}`,
        failure: `http://localhost:5000/mercadoPago/payment-failure`,
        pending: `http://localhost:5000/mercadoPago/payment-pending`,
      },
      auto_return: 'approved', // Automatically return to success URL if the payment is approved
    };

    // Create the payment preference via MercadoPago SDK
    const response = await preference.create({ body: preferenceData });
    
    // Return the payment URL to the client to initiate the payment
    res.json({ init_point: response.init_point });
  } catch (error) {
    // Handle any error during the payment creation process
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Error creating payment' });
  }
});

// GET route to handle the successful payment callback from MercadoPago
router.get('/payment-success', async (req, res) => {
  const { payment_id, token, sneaker_id, quantity, color } = req.query; // Extract query parameters

  console.log('Data received in payment-success:', req.query);

  // If no token is found, redirect to the login page
  if (!token) {
    console.error('Token not found in redirect');
    return res.redirect('http://localhost:3000/login'); // Redirect to login page if token is missing
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    console.log('Decoded token in payment-success:', decoded);

    // Check if the payment has already been processed to avoid duplicate orders
    const existingOrder = await Order.findOne({ where: { payment_id } });
    if (existingOrder) {
      console.log('Payment already processed:', existingOrder);
      return res.redirect(`http://localhost:3000/orders?token=${token}`); // Redirect to orders page if the payment already exists
    }

    // If no existing order, proceed to redirect the user to the orders page with the payment and product details
    res.redirect(`http://localhost:3000/orders?sneaker_id=${sneaker_id}&quantity=${quantity}&payment_id=${payment_id}&color=${color}&token=${token}`);
  } catch (err) {
    // Handle any error during token verification or order creation
    console.error('Error verifying the token:', err);
    res.redirect('http://localhost:3000/login'); // Redirect to login page if token is invalid
  }
});

// GET route to handle the pending payment state callback from MercadoPago
router.get('/payment-pending', (req, res) => {
  const { payment_id, collection_status, status, external_reference } = req.query; // Extract query parameters

  console.log('Payment pending:', req.query);

  // Serve an HTML page to show the pending payment status with a countdown to redirect to failure
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Pending</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #fff3cd;
        }
        .container {
          text-align: center;
        }
        h1 {
          color: #856404;
        }
        p {
          font-size: 18px;
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Payment Pending</h1>
        <p>Processing your payment. If the status doesn't update, you will be redirected to the failure page in <span id="countdown">20</span> seconds...</p>
      </div>
      <script>
        let countdown = 20;
        const countdownElement = document.getElementById('countdown');

        // Countdown timer to redirect to failure page after 20 seconds
        const interval = setInterval(() => {
          countdown--;
          countdownElement.textContent = countdown;
          if (countdown === 0) {
            clearInterval(interval);
            window.location.href = 'http://localhost:5000/mercadoPago/payment-failure';
          }
        }, 1000);
      </script>
    </body>
    </html>
  `);
});

module.exports = router;
