const prismaProd = require('../utils/prisma');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await prismaProd.product.findMany({ include: { category: true, artisan: true, reviews: true } });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const product = await prismaProd.product.findUnique({
      where: { product_id: id },
      include: { category: true, artisan: true, reviews: true }
    });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const data = req.body; // expect name, description, price, category_id, artisan_id, image_url
    const product = await prismaProd.product.create({ data });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const product = await prismaProd.product.update({ where: { product_id: id }, data: req.body });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prismaProd.product.delete({ where: { product_id: id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};