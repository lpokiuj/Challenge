const { Router } = require('express');

// Import controller
const authController = require('../controllers/auth.controller');

const router = Router();

// Register user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

module.exports = router;