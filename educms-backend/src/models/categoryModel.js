const { pool } = require('../config/db');

const getAllCategories = async () => {
  const result = await pool.query(
    'SELECT * FROM categories ORDER BY category_id ASC'
  );
  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM categories WHERE category_id = $1',
    [id]
  );
  return result.rows[0];
};

const createCategory = async ({ name, slug, description }) => {
  const result = await pool.query(
    `INSERT INTO categories (name, slug, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, slug, description]
  );
  return result.rows[0];
};

const updateCategory = async (id, { name, slug, description }) => {
  const result = await pool.query(
    `UPDATE categories
     SET name = $1, slug = $2, description = $3
     WHERE category_id = $4
     RETURNING *`,
    [name, slug, description, id]
  );
  return result.rows[0];
};

const deleteCategory = async (id) => {
  const result = await pool.query(
    'DELETE FROM categories WHERE category_id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};