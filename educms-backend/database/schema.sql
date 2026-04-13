-- =========================
-- USERS
-- =========================
CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   username VARCHAR(50) UNIQUE NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   password_hash VARCHAR(255) NOT NULL,
   first_name VARCHAR(50),
   last_name VARCHAR(50),
   role VARCHAR(20) DEFAULT 'subscriber',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CATEGORIES
-- =========================
CREATE TABLE categories (
   category_id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   slug VARCHAR(100) UNIQUE NOT NULL,
   description TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- POSTS
-- =========================
CREATE TABLE posts (
   post_id SERIAL PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   slug VARCHAR(255) UNIQUE NOT NULL,
   content TEXT NOT NULL,
   author_id INTEGER REFERENCES users(user_id),
   category_id INTEGER REFERENCES categories(category_id),
   status VARCHAR(20) DEFAULT 'draft',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   published_at TIMESTAMP
);

-- =========================
-- TAGS
-- =========================
CREATE TABLE tags (
   tag_id SERIAL PRIMARY KEY,
   name VARCHAR(50) UNIQUE NOT NULL,
   slug VARCHAR(50) UNIQUE NOT NULL
);

-- =========================
-- POST TAGS (MANY-TO-MANY)
-- =========================
CREATE TABLE post_tags (
   post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
   tag_id INTEGER REFERENCES tags(tag_id) ON DELETE CASCADE,
   PRIMARY KEY (post_id, tag_id)
);

-- =========================
-- COMMENTS
-- =========================
CREATE TABLE comments (
   comment_id SERIAL PRIMARY KEY,
   post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
   user_id INTEGER REFERENCES users(user_id),
   content TEXT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- MEDIA
-- =========================
CREATE TABLE media (
   media_id SERIAL PRIMARY KEY,
   filename VARCHAR(255),
   file_path VARCHAR(255),
   uploaded_by INTEGER REFERENCES users(user_id),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
