const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { pool, testConnection } = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const categoryRoutes = require('./src/routes/categories');
const tagRoutes = require('./src/routes/tags');
const postRoutes = require('./src/routes/posts');
const commentRoutes = require('./src/routes/comments');
const mediaRoutes = require('./src/routes/media');
const dashboardRoutes = require('./src/routes/dashboard');


dotenv.config();
const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/dashboard', dashboardRoutes);


// Health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// Database test route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Database connected successfully',
      time: result.rows[0],
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

const PORT = process.env.PORT || 5000;

(async () => {
  const connected = await testConnection();

  if (!connected) {
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();