const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Simple login route for JWT token generation
router.post('/login', authController.login);

// Register a new user
router.post('/register', authController.register);

module.exports = router;