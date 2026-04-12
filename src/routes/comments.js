const express = require('express');
const router = express.Router();

const {
  getComments,
  createComment,
  approveComment,
  deleteComment,
} = require('../controllers/commentController');

const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getComments);
router.post('/', authenticate, createComment);
router.put('/:id/approve', authenticate, authorize('admin', 'editor'), approveComment);
router.delete('/:id', authenticate, authorize('admin', 'editor'), deleteComment);

module.exports = router;