const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const verifyAdmin = require('../middleware/authMiddleware');
const { getIO } = require('../socket');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// POST new category (admin-only)
router.post('/', verifyAdmin, async (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: 'Name and slug are required' });
  }

  try {
    const newCategory = new Category({ name, slug });
    await newCategory.save();

    // Emit real-time category creation
    getIO().emit('category:created', newCategory);

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
});

module.exports = router;
