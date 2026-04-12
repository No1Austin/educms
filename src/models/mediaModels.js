const { pool } = require('../config/db');

const getAllMedia = async () => {
  const result = await pool.query(
    `SELECT * FROM media ORDER BY media_id DESC`
  );
  return result.rows;
};

const createMedia = async ({
  filename,
  original_name,
  file_path,
  file_type,
  file_size,
  mime_type,
  uploaded_by,
}) => {
  const result = await pool.query(
    `INSERT INTO media 
     (filename, original_name, file_path, file_type, file_size, mime_type, uploaded_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [filename, original_name, file_path, file_type, file_size, mime_type, uploaded_by]
  );

  return result.rows[0];
};

const deleteMedia = async (id) => {
  const result = await pool.query(
    `DELETE FROM media WHERE media_id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllMedia,
  createMedia,
  deleteMedia,
};