const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupportTicket = sequelize.define('SupportTicket', {
  userId: {
    type: DataTypes.INTEGER, // Links the ticket to the user who created it
  },
  title: {
    type: DataTypes.STRING, // Short description of the issue
  },
  description: {
    type: DataTypes.TEXT, // Detailed explanation of the issue
  },
  status: {
    type: DataTypes.STRING, // Tracks ticket progress (e.g., "open", "closed")
    defaultValue: 'open',
  },
}, {
  tableName: 'support_tickets',
  timestamps: true, // Handles `createdAt` and `updatedAt` columns automatically
});

module.exports = SupportTicket;