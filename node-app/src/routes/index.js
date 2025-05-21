const express = require('express');
const router = express.Router();

router.use('/auth',     require('./auth.routes'));
router.use('/artisans', require('./artisan.routes'));
router.use('/categories',require('./category.routes'));
router.use('/customers', require('./customer.routes'));
router.use('/orders',    require('./order.routes'));
router.use('/products',  require('./product.routes'));
router.use('/reviews',   require('./review.routes'));

module.exports = router;
