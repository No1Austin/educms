const { pool } = require('../config/db');

const User = {
  create: async ({ username, email, password_hash, first_name, last_name, role = 'subscriber' }) => {
    const query = `
      INSERT INTO users (username, email, password_hash, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, username, email, first_name, last_name, role, created_at
    `;
    const values = [username, email, password_hash, first_name, last_name, role];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query(
      `SELECT user_id, username, email, first_name, last_name, role, created_at
       FROM users
       WHERE user_id = $1
       LIMIT 1`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = User;