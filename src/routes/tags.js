const express = require('express');
const router = express.Router();

const {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} = require('../controllers/tagController');

const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getTags);
router.get('/:id', getTagById);

router.post('/', authenticate, authorize('admin', 'editor'), createTag);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateTag);
router.delete('/:id', authenticate, authorize('admin'), deleteTag);

module.exports = router;