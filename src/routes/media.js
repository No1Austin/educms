const express = require('express');
const router = express.Router();

const {
  getMedia,
  uploadMedia,
  deleteMedia,
} = require('../controllers/mediaController');

const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getMedia);
router.post(
  '/',
  authenticate,
  authorize('admin', 'editor'),
  upload.single('file'),
  uploadMedia
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'editor'),
  deleteMedia
);

module.exports = router;