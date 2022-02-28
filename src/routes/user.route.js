const { Router } = require('express');

// Import controller
const userController = require('../controllers/user.controller');

// Import middleware
const verifyToken = require('../middleware/verifyToken');

const router = Router();

// Get all user
router.get('/', verifyToken, userController.getAllUser);

// Get user by id
router.get('/:id', verifyToken, userController.getUserbyId);

// Update data user

// Delete user

module.exports = router;