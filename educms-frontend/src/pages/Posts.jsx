import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import api from '../api/axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    category_id: '',
    tag_id: '',
    status: 'draft',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts || response.data.data || []);
    } catch (err) {
      console.error('Fetch posts error:', err);
      setError('Failed to load posts');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.categories || response.data.data || []);
    } catch (err) {
      console.error('Fetch categories error:', err);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await api.get('/tags');
      setTags(response.data.tags || response.data.data || []);
    } catch (err) {
      console.error('Fetch tags error:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        category_id: form.category_id || null,
        tag_id: form.tag_id || null,
        status: form.status,
      };

      const response = await api.post('/posts', payload);

      setSuccess(response.data.message || 'Post created successfully');
      setForm({
        title: '',
        slug: '',
        content: '',
        category_id: '',
        tag_id: '',
        status: 'draft',
      });

      await fetchPosts();
    } catch (err) {
      console.error('Create post error:', err);
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Posts
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Create and manage educational content posts.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        <Grid xs={12} lg={5}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Create Post
            </Typography>

            <form onSubmit={handleCreate}>
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  minRows={6}
                  required
                />

                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category_id"
                    value={form.category_id}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    {categories.map((category) => (
                      <MenuItem
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Tag</InputLabel>
                  <Select
                    name="tag_id"
                    value={form.tag_id}
                    label="Tag"
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    {tags.map((tag) => (
                      <MenuItem key={tag.tag_id} value={tag.tag_id}>
                        {tag.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={form.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                  </Select>
                </FormControl>

                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Post'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        <Grid xs={12} lg={7}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Post List
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Slug</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <TableRow key={post.post_id}>
                      <TableCell>{post.post_id}</TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.slug}</TableCell>
                      <TableCell>{post.status}</TableCell>
                      <TableCell>
                        {post.category_name || post.category_id || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No posts found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Posts;