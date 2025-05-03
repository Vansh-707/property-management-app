// backend/src/routes/unitRoutes.js

const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');
const { auth } = require('../middleware/auth');

// Create a new unit
router.post('/', unitController.createUnit);

// Get all available units
router.get('/available', unitController.getAvailableUnits);

// Book a unit (protected by auth)
router.put('/:id/book', auth, unitController.bookUnit);

// Export the router
module.exports = router;