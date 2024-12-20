const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/supportTickets');
const { verifyUser, verifyAdmin } = require('../../middleware/authenticateToken');


// Only authenticated users can create tickets.
router.post('/tickets', verifyUser, async (req, res) => {
  const { title, description } = req.body;

  // Check if the title is provided in the request body.
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  // Check if the description is provided in the request body.
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  try {
    // Creates a new support ticket and associates it with the authenticated user's ID.
    const newTicket = await SupportTicket.create({
      userId: req.user.id,
      title,
      description,
      status: 'open', // Default status for a newly created ticket.
    });

    // Responds with the created ticket data and a success message.
    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    // Handles errors during the ticket creation process.
    console.error('Error creating ticket:', error.message);
    res.status(500).json({ error: 'Failed to create ticket', details: error.message });
  }
});

// Retrieve all support tickets.
// Only administrators can access the list of tickets.
router.get('/tickets', verifyAdmin, async (req, res) => {
  try {
    // Fetches all tickets from the database and orders them by creation date (newest first).
    const tickets = await SupportTicket.findAll({ order: [['createdAt', 'DESC']] });

    // Responds with the list of tickets.
    res.status(200).json(tickets);
  } catch (error) {
    // Handles errors during the retrieval of tickets.
    res.status(500).json({ error: 'Failed to retrieve tickets', details: error.message });
  }
});

module.exports = router;