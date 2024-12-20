const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');
const Sneaker = require('./sneaker');
const Order = require('./order');

// Define relationships between models
Order.belongsTo(User, { foreignKey: 'user_id' }); // Each order is linked to a specific user
Order.belongsTo(Sneaker, { foreignKey: 'sneaker_id' }); // Each order is linked to a specific sneaker

User.hasMany(Order, { foreignKey: 'user_id' }); // A user can have multiple orders
Sneaker.hasMany(Order, { foreignKey: 'sneaker_id' }); // A sneaker can appear in multiple orders

module.exports = {
  sequelize,
  User,
  Sneaker,
  Order,
};