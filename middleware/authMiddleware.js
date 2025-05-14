const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_secret_key';

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: not an admin' });
    }

    req.user = decoded; // Optional: save user info for downstream use
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyAdmin;
