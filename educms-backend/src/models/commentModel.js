const { pool } = require('../config/db');

const getAllComments = async () => {
  const result = await pool.query(`
    SELECT 
      c.*,
      p.title AS post_title
    FROM comments c
    LEFT JOIN posts p ON c.post_id = p.post_id
    ORDER BY c.comment_id DESC
  `);

  return result.rows;
};

const createComment = async ({ post_id, user_id, content }) => {
  const result = await pool.query(
    `INSERT INTO comments (post_id, user_id, content, status)
     VALUES ($1, $2, $3, 'pending')
     RETURNING *`,
    [post_id, user_id, content]
  );

  return result.rows[0];
};

const approveComment = async (id) => {
  const result = await pool.query(
    `UPDATE comments
     SET status = 'approved', updated_at = CURRENT_TIMESTAMP
     WHERE comment_id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

const deleteComment = async (id) => {
  const result = await pool.query(
    `DELETE FROM comments
     WHERE comment_id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllComments,
  createComment,
  approveComment,
  deleteComment,
};