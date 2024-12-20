const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Sneaker = sequelize.define('Sneaker', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Automatically increments with each new sneaker entry
    primaryKey: true, // Uniquely identifies each sneaker in the table
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.JSON, // Stores multiple image URLs for different colors
    allowNull: true, 
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Allows prices with two decimal places
    allowNull: false,
  },
  color: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('Man', 'Woman', 'Unisex', 'Kids'), // Categories for gender-specific or unisex sneakers
    allowNull: false,
  },
  available_sizes: {
    type: DataTypes.JSON, // Stores available sizes in JSON format
    allowNull: true,
  },
  discount_percentage: {
    type: DataTypes.DECIMAL(5, 2), // Stores the discount as a percentage
    defaultValue: 0.00,
  },
  created_at: {
    type: DataTypes.DATE, // Tracks when the sneaker was created
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE, // Tracks when the sneaker was last updated
    defaultValue: DataTypes.NOW,
  },
  type: {
    type: DataTypes.ENUM('Urban', 'Sport'),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER, // Tracks the number of sneakers available
    defaultValue: 10, // Defaults to 10 in stock if not specified
  },
}, {
  tableName: 'SNEAKERS',
  timestamps: true, // Automatically handles createdAt and updatedAt columns
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Sneaker;