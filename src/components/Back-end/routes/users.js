const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyUser } = require('../../middleware/authenticateToken');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};

// Middleware to validate and decode a JWT token included in the request headers.
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'] || null;

  // If the token is missing, reject the request.
  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  // Validate the token and decode its payload.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Check if the token has expired and respond accordingly.
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(403).json({ message: 'Invalid token' });
    }
    next();
  });
}

// Utility function to extract the first name from a full name string.
const getFirstName = (fullName) => fullName.split(' ')[0].trim();

// Route to retrieve the profile of the authenticated user.
router.get('/profile', verifyUser, async (req, res) => {
  try {
    // Fetch the user from the database using the user ID from the token payload.
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Extract and format the first name for a personalized response.
    const firstName = user.name.split(' ')[0];

    // Respond with the user's profile information.
    res.json({
      id: user.id,
      name: firstName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if a user with the given email already exists in the database.
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'The email has already been registered' });
    }

    // Generate a unique salt for password hashing.
    const salt = await bcrypt.genSalt(10);

    // Hash the password securely using the generated salt.
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database with the hashed password.
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Prepare the payload for the JWT token with user details.
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin || false,
      },
    };

    // Generate a JWT token valid for 1 hour.
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Extract the first name for a more user-friendly response.
    const firstName = getFirstName(user.name);

    // Respond with the registration confirmation and token.
    res.status(201).json({
      msg: 'User registered successfully',
      name: firstName,
      token,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database.
    const user = await User.findOne({ where: { email } });

    // Validate the provided password with the stored hashed password.
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Prepare the payload for the JWT token with user details.
    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };

    // Generate a JWT token valid for 1 hour.
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the login confirmation and token.
    res.json({ msg: 'Login successful', name: user.name, token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Respond with an error for unsupported GET requests to the login endpoint.
router.get('/login', (req, res) => {
  res.status(400).json({ msg: 'Please use POST for login' });
});

// Placeholder route for resetting passwords (functionality not implemented yet).
router.post('/reset-password', async (req, res) => {
  // Logic for resetting the password would go here in the future.
});

module.exports = router;