const Article = require('../models/Article');
const { getIO } = require('../socket');

exports.getArticles = async (req, res) => {
  const articles = await Article.find().populate('category');
  res.json(articles);
};

exports.createArticle = async (req, res) => {
  const article = new Article(req.body);
  await article.save();

  getIO().emit('article:created', article); // <-- emit

  res.status(201).json(article);
};

exports.updateArticle = async (req, res) => {
  const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });

  getIO().emit('article:updated', updated); // <-- emit

  res.json(updated);
};

exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);

  getIO().emit('article:deleted', req.params.id); // <-- emit article ID

  res.json({ message: 'Article deleted' });
};
