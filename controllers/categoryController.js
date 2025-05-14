const Category = require('../models/Category');
const { getIO } = require('../socket');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createCategory = async (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: 'Name and Slug are required' });
  }

  try {
    const category = new Category({ name, slug });
    await category.save();

    getIO().emit('category:created', category); // <-- emit

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
};
