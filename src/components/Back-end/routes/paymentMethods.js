const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Endpoint to get payment methods from Mercado Pago
router.get('/payment-methods', async (req, res) => {
    try {
      // Make an API request to Mercado Pago to fetch payment methods
      const response = await axios.get('https://api.mercadopago.com/v1/payment_methods', {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
  
      // Send the list of payment methods received from Mercado Pago
      res.json(response.data);  // Respond with the payment methods data
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      res.status(500).json({ error: "Error fetching payment methods" });
    }
  });

module.exports = router;