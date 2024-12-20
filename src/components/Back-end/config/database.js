const Sequelize = require('sequelize');
require('dotenv').config({ path: 'D:/React/ecommerce-project/.env' });

// A Sequelize instance to connect to the database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
  }
);

module.exports = { sequelize }; 