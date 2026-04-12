const express = require('express');
const router = express.Router();

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getCategories);
router.get('/:id', getCategoryById);

router.post('/', authenticate, authorize('admin', 'editor'), createCategory);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateCategory);
router.delete('/:id', authenticate, authorize('admin'), deleteCategory);

module.exports = router;