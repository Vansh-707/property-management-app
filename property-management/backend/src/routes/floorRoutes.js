// backend/src/routes/floorRoutes.js

const express = require('express');
const router = express.Router();
const floorController = require('../controllers/floorController');

// Create a new floor
router.post('/', floorController.createFloor);

// Get all floors for a specific property
router.get('/property/:propertyId', floorController.getFloorsByProperty);

module.exports = router;