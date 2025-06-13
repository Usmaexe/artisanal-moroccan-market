const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  // Special handling for demo token in non-production environments
  if (token === 'demo-token' && process.env.NODE_ENV !== 'production') {
    // Set a mock user for demo purposes
    req.user = {
      id: 999,
      email: 'demo@example.com',
      role: 'admin'
    };
    return next();
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
