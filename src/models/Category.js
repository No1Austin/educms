const { pool } = require('../config/db');

const Category = {
  create: async ({ name, slug, description }) => {
    const query = `
      INSERT INTO categories (name, slug, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [name, slug, description || null];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findAll: async () => {
    const result = await pool.query(
      `SELECT * FROM categories ORDER BY created_at DESC`
    );
    return result.rows;
  },

  findById: async (id) => {
    const result = await pool.query(
      `SELECT * FROM categories WHERE category_id = $1 LIMIT 1`,
      [id]
    );
    return result.rows[0];
  },

  findBySlug: async (slug) => {
    const result = await pool.query(
      `SELECT * FROM categories WHERE slug = $1 LIMIT 1`,
      [slug]
    );
    return result.rows[0];
  },

  update: async (id, { name, slug, description }) => {
    const query = `
      UPDATE categories
      SET name = $1, slug = $2, description = $3, updated_at = CURRENT_TIMESTAMP
      WHERE category_id = $4
      RETURNING *
    `;
    const values = [name, slug, description || null, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  remove: async (id) => {
    const result = await pool.query(
      `DELETE FROM categories WHERE category_id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Category;