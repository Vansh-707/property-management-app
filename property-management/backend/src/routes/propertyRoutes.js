// backend/src/routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Create a new property
router.post('/', propertyController.createProperty);

// Get property details by ID
router.get('/:id/details', propertyController.getPropertyDetails);

// Get full property details, including nested floors and units
router.get('/:id/details', propertyController.getPropertyDetails);

// Get all properties
router.get('/', propertyController.getAllProperties);

module.exports = router;