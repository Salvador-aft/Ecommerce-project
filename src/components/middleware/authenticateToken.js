const jwt = require('jsonwebtoken');

// Middleware to verify if the user is authenticated
const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and has the correct format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach the decoded user to the request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to verify if the user has admin privileges
const verifyAdmin = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user?.isAdmin) {
      next(); // Proceed if the user is an admin
    } else {
      res.status(403).json({ msg: 'Access denied: Admin privileges required' });
    }
  });
};

module.exports = { verifyUser, verifyAdmin };