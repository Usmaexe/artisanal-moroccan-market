const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Protected
router.post('/', authenticateToken, categoryController.createCategory);
router.put('/:id', authenticateToken, categoryController.updateCategory);
router.delete('/:id', authenticateToken, categoryController.deleteCategory);

module.exports = router;
