const express = require('express');
const router = express.Router();
const { verifyUser } = require('../../middleware/authenticateToken');

// Route to check if the provided token is valid
router.post('/verify-token', verifyUser, (req, res) => {
  res.status(200).json({ msg: 'Token is valid', user: req.user });
});

module.exports = router;