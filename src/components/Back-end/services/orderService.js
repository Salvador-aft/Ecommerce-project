const { Order, Sneaker } = require('../models');

const createOrder = async ({ user_id, sneaker_id, quantity, payment_id }) => {
  // Ensure all required data is provided
  if (!user_id || !sneaker_id || !quantity || !payment_id) {
    throw new Error('Missing required data'); // Throw an error if any field is missing
  }

  // Look up the sneaker in the database using its ID
  const sneaker = await Sneaker.findByPk(sneaker_id);
  if (!sneaker) {
    throw new Error('Sneaker not found'); // If the sneaker doesn't exist, stop here
  }

  // Check if there is enough stock for the requested quantity
  if (sneaker.stock < quantity) {
    throw new Error('Insufficient stock'); // Not enough sneakers available
  }

  // Reduce the sneaker's stock by the quantity being ordered
  sneaker.stock -= quantity;
  await sneaker.save(); // Save the updated stock to the database

  // Create a new order in the database with the provided details
  const order = await Order.create({
    user_id,
    sneaker_id,
    quantity,
    payment_id,
    status: 'Completed', // Automatically mark the order as completed
  });

  return order;
};