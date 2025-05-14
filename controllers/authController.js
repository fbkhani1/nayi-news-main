const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getIO } = require('../socket');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || !await bcrypt.compare(password, admin.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hash });
  await admin.save();

  // Emit new admin registration
  getIO().emit('admin:registered', { id: admin._id, email });

  res.status(201).json({ message: 'Admin created' });
};
