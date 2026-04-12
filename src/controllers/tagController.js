const tagModel = require('../models/tagModel');

const getTags = async (req, res) => {
  try {
    const tags = await tagModel.getAllTags();

    res.status(200).json({
      success: true,
      count: tags.length,
      tags,
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags',
      error: error.message,
    });
  }
};

const getTagById = async (req, res) => {
  try {
    const tag = await tagModel.getTagById(req.params.id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found',
      });
    }

    res.status(200).json({
      success: true,
      tag,
    });
  } catch (error) {
    console.error('Get tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tag',
      error: error.message,
    });
  }
};

const createTag = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required',
      });
    }

    const newTag = await tagModel.createTag({
      name,
      slug,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Tag created successfully',
      tag: newTag,
    });
  } catch (error) {
    console.error('Create tag error:', error);

    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Tag slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create tag',
      error: error.message,
    });
  }
};

const updateTag = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required',
      });
    }

    const updatedTag = await tagModel.updateTag(req.params.id, {
      name,
      slug,
      description,
    });

    if (!updatedTag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tag updated successfully',
      tag: updatedTag,
    });
  } catch (error) {
    console.error('Update tag error:', error);

    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Tag slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update tag',
      error: error.message,
    });
  }
};

const deleteTag = async (req, res) => {
  try {
    const deletedTag = await tagModel.deleteTag(req.params.id);

    if (!deletedTag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tag deleted successfully',
      tag: deletedTag,
    });
  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete tag',
      error: error.message,
    });
  }
};

module.exports = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};