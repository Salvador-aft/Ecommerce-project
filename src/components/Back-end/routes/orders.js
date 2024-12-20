const express = require('express');
const router = express.Router();
const { verifyUser } = require('../../middleware/authenticateToken');
const { Order, Sneaker } = require('../models');
const { sequelize } = require('../config/database');

// Route to get all orders of a user
router.get('/', verifyUser, async (req, res) => {
  try {
    // Fetch orders where the user_id matches the logged-in user's ID
    const orders = await Order.findAll({
      where: { user_id: req.user.id },  // Filtering by user ID
      include: [{ model: Sneaker, attributes: ['name', 'image_url', 'price'] }],  // Include sneaker details
      order: [['created_at', 'DESC']],  // Orders sorted by creation date, descending
    });

    // Map through orders and return them, ensuring that the color of the order is included
    res.json(orders.map(order => ({
      ...order.toJSON(),
      color: order.color,  // Ensure the color is included in the response
    })));
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors
  }
});

// Route to create a new order
router.post('/', verifyUser, async (req, res) => {
  const { payment_id, sneaker_id, quantity, color } = req.body;

  // Check for missing required fields
  if (!payment_id || !sneaker_id || !quantity || !color) {
    return res.status(400).json({ error: 'Missing required data' });  // Return error if data is missing
  }

  const transaction = await sequelize.transaction();  // Start a new database transaction
  try {
    // Check if an order already exists with the provided payment ID
    const existingOrder = await Order.findOne(
      { where: { payment_id }, lock: true, transaction }
    );

    if (existingOrder) {
      await transaction.rollback();  // If order exists, roll back the transaction
      return res.status(409).json({ error: 'Order already exists', order: existingOrder });  // Return conflict error
    }

    // Create a new order in the database
    const newOrder = await Order.create(
      { user_id: req.user.id, sneaker_id, quantity, payment_id, color, status: 'Completed' },
      { transaction }
    );

    // Fetch the newly created order with its sneaker details
    const completeOrder = await Order.findOne({
      where: { id: newOrder.id },
      include: [
        {
          model: Sneaker,
          attributes: ['name', 'image_url', 'price'],  // Include sneaker details in the response
        },
      ],
    });

    await transaction.commit();  // Commit the transaction if everything went fine
    return res.status(201).json(completeOrder);  // Return the newly created order with sneaker details
  } catch (error) {
    console.error('Error creating order:', error);
    await transaction.rollback();  // Roll back transaction if an error occurs
    return res.status(500).json({ error: 'Error creating new order' });
  }
});

// Route to check if an order with the given payment ID already exists
router.get('/check', verifyUser, async (req, res) => {
  const { payment_id } = req.query;

  // Check if payment ID is provided in the query
  if (!payment_id) {
    return res.status(400).json({ error: 'Payment ID is required' });  // Return error if no payment ID is provided
  }

  try {
    // Check if an order with the given payment ID already exists
    const existingOrder = await Order.findOne({ where: { payment_id } });

    if (existingOrder) {
      console.log(`[CHECK ROUTE] Order with payment ID ${payment_id} already exists.`);
      return res.json({ exists: true, order: existingOrder });  // Return the existing order details if found
    }

    console.log(`[CHECK ROUTE] No order found with payment ID ${payment_id}.`);
    return res.json({ exists: false });  // Return false if no order is found
  } catch (error) {
    console.error('Error checking order existence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;