const postModel = require('../models/postModel');

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, slug, content, category_id, status } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, slug and content are required',
      });
    }

    const newPost = await postModel.createPost({
      title,
      slug,
      content,
      category_id,
      status: status || 'draft',
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error) {
    console.error('Create post error:', error);

    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Post slug already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create post',
    });
  }
};

module.exports = {
  getPosts,
  createPost,
};