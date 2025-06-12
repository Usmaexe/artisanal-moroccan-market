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
    // Extract data from request body
    const { features, materials, ...productData } = req.body;
    
    // Create product without features and materials fields
    const product = await prismaProd.product.create({ data: productData });
    
    // Return the created product with the features and materials (even though they're not stored in DB)
    res.status(201).json({
      ...product,
      features,
      materials
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    // Extract features and materials from request body
    const { features, materials, ...productData } = req.body;
    
    const product = await prismaProd.product.update({ 
      where: { product_id: id }, 
      data: productData 
    });
    
    res.json({
      ...product,
      features,
      materials
    });
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