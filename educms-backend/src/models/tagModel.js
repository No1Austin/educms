const { pool } = require('../config/db');

const getAllTags = async () => {
  const result = await pool.query(
    'SELECT * FROM tags ORDER BY tag_id ASC'
  );
  return result.rows;
};

const getTagById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM tags WHERE tag_id = $1',
    [id]
  );
  return result.rows[0];
};

const createTag = async ({ name, slug, description }) => {
  const result = await pool.query(
    `INSERT INTO tags (name, slug, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, slug, description || null]
  );
  return result.rows[0];
};

const updateTag = async (id, { name, slug, description }) => {
  const result = await pool.query(
    `UPDATE tags
     SET name = $1, slug = $2, description = $3
     WHERE tag_id = $4
     RETURNING *`,
    [name, slug, description || null, id]
  );
  return result.rows[0];
};

const deleteTag = async (id) => {
  const result = await pool.query(
    'DELETE FROM tags WHERE tag_id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};