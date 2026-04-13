const fs = require('fs');
const mediaModel = require('../models/mediaModels');

const getMedia = async (req, res) => {
  try {
    const media = await mediaModel.getAllMedia();

    res.status(200).json({
      success: true,
      media,
    });
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media',
      error: error.message,
    });
  }
};

const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const newMedia = await mediaModel.createMedia({
      filename: req.file.filename,
      original_name: req.file.originalname,
      file_path: req.file.path,
      file_type: req.file.mimetype.split('/')[0],
      file_size: req.file.size,
      mime_type: req.file.mimetype,
      uploaded_by: req.user?.user_id || null,
    });

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      media: newMedia,
    });
  } catch (error) {
    console.error('Upload media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file',
      error: error.message,
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const deleted = await mediaModel.deleteMedia(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    if (deleted.file_path && fs.existsSync(deleted.file_path)) {
      fs.unlinkSync(deleted.file_path);
    }

    res.status(200).json({
      success: true,
      message: 'Media deleted successfully',
      media: deleted,
    });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete media',
      error: error.message,
    });
  }
};

module.exports = {
  getMedia,
  uploadMedia,
  deleteMedia,
};