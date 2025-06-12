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
    const { features, materials, categoryId, ...productData } = req.body;
    
    // Create product with proper category_id field
    const product = await prismaProd.product.create({ 
      data: {
        ...productData,
        category_id: parseInt(categoryId, 10)
      },
      include: { category: true, artisan: true }
    });
    
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
    // Extract features, materials, categoryId, and other non-DB fields from request body
    const { features, materials, categoryId, product_id, inStock, dimensions, ...productData } = req.body;
    
    // Build the update data object with only valid DB fields
    const updateData = {};
    
    // Only include fields that exist in the database
    if (productData.name) updateData.name = productData.name;
    if (productData.description) updateData.description = productData.description;
    if (productData.price !== undefined) updateData.price = productData.price;
    if (productData.image_url) updateData.image_url = productData.image_url;
    if (productData.is_featured !== undefined) updateData.is_featured = productData.is_featured;
    if (productData.rating !== undefined) updateData.rating = productData.rating;
    
    // Map categoryId to category_id if provided
    if (categoryId) {
      updateData.category_id = parseInt(categoryId, 10);
    }
    
    const product = await prismaProd.product.update({ 
      where: { product_id: id }, 
      data: updateData,
      include: { category: true, artisan: true }
    });
    
    res.json({
      ...product,
      features,
      materials,
      dimensions,
      inStock
    });
  } catch (err) {
    console.error('Update product error:', err);
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