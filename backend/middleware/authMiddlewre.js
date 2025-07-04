const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey');
    req.user = decoded; // Add decoded data (e.g., userId) to request object
    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
module.exports = authMiddleware;
