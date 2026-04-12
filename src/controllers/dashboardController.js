const { pool } = require('../config/db');

const getStats = async (req, res) => {
  try {
    const [posts, categories, tags, comments] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM posts'),
      pool.query('SELECT COUNT(*) FROM categories'),
      pool.query('SELECT COUNT(*) FROM tags'),
      pool.query('SELECT COUNT(*) FROM comments'),
    ]);

    res.json({
      success: true,
      data: {
        posts: parseInt(posts.rows[0].count),
        categories: parseInt(categories.rows[0].count),
        tags: parseInt(tags.rows[0].count),
        comments: parseInt(comments.rows[0].count),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getStats };