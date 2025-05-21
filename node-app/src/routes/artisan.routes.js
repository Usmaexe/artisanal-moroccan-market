const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisan.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Public
router.get('/', artisanController.getAllArtisans);
router.get('/:id', artisanController.getArtisanById);

// Protected
router.post('/', authenticateToken, artisanController.createArtisan);
router.put('/:id', authenticateToken, artisanController.updateArtisan);
router.delete('/:id', authenticateToken, artisanController.deleteArtisan);

module.exports = router;
