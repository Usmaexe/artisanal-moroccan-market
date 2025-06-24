const express = require('express');
const router = express.Router();

// Import all route files
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const artisanRoutes = require('./artisan.routes');
const customerRoutes = require('./customer.routes');
const orderRoutes = require('./order.routes');
const reviewRoutes = require('./review.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/artisans', artisanRoutes);
router.use('/customers', customerRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewRoutes);

// Health check for API
router.get('/', (req, res) => {
  res.json({ 
    message: 'API is working!',
    routes: [
      '/api/auth',
      '/api/products', 
      '/api/categories',
      '/api/artisans',
      '/api/customers',
      '/api/orders',
      '/api/reviews'
    ]
  });
});

module.exports = router;