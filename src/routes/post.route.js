const { Router } = require('express');

// Import middleware
const verifyToken = require('../middleware/verifyToken');

// Import controller
const postController = require('../controllers/post.controller');

const router = Router();

// Create post
router.post('/', verifyToken, postController.createPost);

// Get post
router.get('/', verifyToken, postController.getPost);

// Get post by id 
router.get('/:id', verifyToken, postController.getPostbyId);

// Update post
router.put('/:id', verifyToken, postController.updatePostbyId);

// Delete post 
router.delete('/:id', verifyToken, postController.deletePostbyId);

module.exports = router;