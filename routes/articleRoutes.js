const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Category = require('../models/Category');
const verifyAdmin = require('../middleware/authMiddleware'); // Admin-only
const { getIO } = require('../socket');

// POST new article (admin-only)
router.post('/', verifyAdmin, async (req, res) => {
  const { title, content, categoryId } = req.body;

  if (!title || !content || !categoryId) {
    return res.status(400).json({ message: 'Title, content, and category are required' });
  }

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newArticle = new Article({
      title,
      content,
      category: categoryId,
    });

    await newArticle.save();

    // Emit to all clients
    getIO().emit('article:created', newArticle);

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article' });
  }
});

module.exports = router;
