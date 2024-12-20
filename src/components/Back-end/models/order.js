const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,  // Automatically increments for each new order
        primaryKey: true, 
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER, // Links the order to a specific user
        allowNull: false,
    },
    sneaker_id: {
        type: DataTypes.INTEGER, // Links the order to a specific sneaker
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_id: {
        type: DataTypes.STRING, // Identifies the payment associated with the order
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'), // Represents the current state of the order
        defaultValue: 'Completed', // Default value when an order is created
    },
}, {
    tableName: 'Orders',
    timestamps: true, // Adds automatic created_at and updated_at timestamps
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Order;