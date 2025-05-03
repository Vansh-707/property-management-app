const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Simple login route for JWT token generation
router.post('/login', authController.login);

module.exports = router;