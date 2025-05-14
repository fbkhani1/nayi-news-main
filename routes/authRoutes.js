const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Dummy user authentication (you can replace it with your DB check)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Replace this with DB authentication logic
  if (username === 'admin' && password === 'admin123') {
    // Admin role
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
