const prismaCat = require('../utils/prisma');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await prismaCat.category.findMany({ include: { products: true } });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const cat = await prismaCat.category.findUnique({
      where: { category_id: id },
      include: { products: true }
    });
    if (!cat) return res.status(404).json({ message: 'Not found' });
    res.json(cat);
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, image_url } = req.body;
    const category = await prismaCat.category.create({ data: { name, image_url } });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const category = await prismaCat.category.update({ where: { category_id: id }, data: req.body });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prismaCat.category.delete({ where: { category_id: id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};