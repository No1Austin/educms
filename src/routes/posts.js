const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', postController.getPosts);

if (postController.getPostById) {
  router.get('/:id', postController.getPostById);
}

router.post('/', authenticate, authorize('admin', 'editor'), postController.createPost);

if (postController.updatePost) {
  router.put('/:id', authenticate, authorize('admin', 'editor'), postController.updatePost);
}

if (postController.deletePost) {
  router.delete('/:id', authenticate, authorize('admin'), postController.deletePost);
}

module.exports = router;