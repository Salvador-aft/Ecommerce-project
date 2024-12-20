require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/database');
const sneakerRoutes = require('./routes/sneakers'); 
const userRoutes = require('./routes/users'); 
const mercadoPagoPaymentRoutes = require('./routes/mercadoPagoPayment');
const paymentMethodsRouter = require('./routes/paymentMethods');
const supportTicketsRouter = require('./routes/supportTickets');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./controllers.js/verifyToken');

const app = express();

// This ensures that the required environment variable for signing JWTs is loaded.
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not defined in the environment");
  process.exit(1); // Stops the application if this critical variable is missing
} else {
  console.log("JWT_SECRET successfully loaded");
}

// Configures the app to handle JSON payloads in incoming requests.
app.use(express.json()); // Built-in middleware from Express
app.use(bodyParser.json()); // Redundant when using express.json(), can be removed if desired

// Allows cross-origin requests, specifically enabling communication between frontend and backend.
app.use(cors({
  origin: 'http://localhost:3000', // URL of the frontend application
  credentials: true, // Allows cookies and headers with credentials
}));

// Tests and synchronizes the database connection using Sequelize.
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter: true }); // Updates the database schema
  })
  .then(() => {
    console.log('Database synced');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });


// Provides a simple endpoint to verify that the API is running.
app.get('/test', (req, res) => {
  res.send('API is working!');
});

app.use('/sneakers', sneakerRoutes);
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/users', userRoutes);
app.use('/mercadoPago', mercadoPagoPaymentRoutes);
app.use('/api', paymentMethodsRouter);
app.use('/api', supportTicketsRouter);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000; // Default to port 5000 if no environment variable is set
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));