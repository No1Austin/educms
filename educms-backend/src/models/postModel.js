const { pool } = require('../config/db');

const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT p.*, c.name AS category_name
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.category_id
    ORDER BY p.post_id DESC
  `);
  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query(
    `SELECT p.*, c.name AS category_name
     FROM posts p
     LEFT JOIN categories c ON p.category_id = c.category_id
     WHERE p.post_id = $1`,
    [id]
  );

  return result.rows[0];
};

const createPost = async ({
  title,
  slug,
  content,
  category_id,
  status,
  featured_image,
}) => {
  const result = await pool.query(
    `INSERT INTO posts (title, slug, content, category_id, status, featured_image)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, slug, content, category_id || null, status, featured_image || null]
  );

  return result.rows[0];
};

const updatePost = async (
  id,
  { title, slug, content, category_id, status, featured_image }
) => {
  const result = await pool.query(
    `UPDATE posts
     SET title = $1,
         slug = $2,
         content = $3,
         category_id = $4,
         status = $5,
         featured_image = $6,
         updated_at = CURRENT_TIMESTAMP
     WHERE post_id = $7
     RETURNING *`,
    [title, slug, content, category_id || null, status, featured_image || null, id]
  );

  return result.rows[0];
};

const deletePost = async (id) => {
  const result = await pool.query(
    `DELETE FROM posts
     WHERE post_id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};