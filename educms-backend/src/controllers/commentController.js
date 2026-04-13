const commentModel = require('../models/commentModel');

const getComments = async (req, res) => {
  try {
    const comments = await commentModel.getAllComments();

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch comments',
    });
  }
};

const createComment = async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const user_id = req.user?.user_id; // or req.user?.user_id depending on your auth payload


    if (!post_id || !content) {
      return res.status(400).json({
        success: false,
        message: 'post_id and content are required',
      });
    }

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const newComment = await commentModel.createComment({
      post_id,
      user_id,
      content,
    });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      comment: newComment,
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create comment',
    });
  }
};

const approveComment = async (req, res) => {
  try {
    const approved = await commentModel.approveComment(req.params.id);

    if (!approved) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Comment approved successfully',
      comment: approved,
    });
  } catch (error) {
    console.error('Approve comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve comment',
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deleted = await commentModel.deleteComment(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
      comment: deleted,
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete comment',
    });
  }
};

module.exports = {
  getComments,
  createComment,
  approveComment,
  deleteComment,
};