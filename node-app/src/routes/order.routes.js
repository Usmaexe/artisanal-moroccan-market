const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// All order routes require authentication
router.use(authenticateToken);

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
