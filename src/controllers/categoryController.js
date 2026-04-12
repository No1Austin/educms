const categoryModel = require('../models/categoryModel');

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required',
      });
    }

    const newCategory = await categoryModel.createCategory({
      name,
      slug,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    console.error('Create category error:', error);

    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Category slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create category',
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required',
      });
    }

    const updatedCategory = await categoryModel.updateCategory(req.params.id, {
      name,
      slug,
      description,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory,
    });
  } catch (error) {
    console.error('Update category error:', error);

    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Category slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update category',
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryModel.deleteCategory(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      category: deletedCategory,
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category',
      error: error.message,
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};