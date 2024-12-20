const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Function to register a new user
const createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    // Encrypting the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Creating the user in the database with the provided data
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Default to false if isAdmin is not provided
    });

    res.status(201).json({ msg: 'User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};