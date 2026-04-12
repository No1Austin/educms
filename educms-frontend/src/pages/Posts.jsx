import { useEffect, useMemo, useState } from 'react';
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
import { useAuth } from '../context/AuthContext';

const Posts = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    category_id: '',
    tag_id: '',
    status: 'draft',
    featured_image: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const canCreateOrEdit = ['admin', 'editor'].includes(user?.role);
  const canDelete = user?.role === 'admin';

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts || response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.categories || response.data.data || []);
    } catch {}
  };

  const fetchTags = async () => {
    try {
      const response = await api.get('/tags');
      setTags(response.data.tags || response.data.data || []);
    } catch {}
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/posts', {
        ...form,
        category_id: form.category_id || null,
        tag_id: form.tag_id || null,
        featured_image: form.featured_image || null,
      });

      setSuccess('Post created successfully');
      setForm({
        title: '',
        slug: '',
        content: '',
        category_id: '',
        tag_id: '',
        status: 'draft',
        featured_image: '',
      });

      await fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this post?');
    if (!confirmed) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p.post_id !== id));
      setSuccess('Post deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || '';
      const slug = post.slug?.toLowerCase() || '';
      const term = search.toLowerCase();
      return title.includes(term) || slug.includes(term);
    });
  }, [posts, search]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Posts
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Create and manage educational content posts.
      </Typography>

      <TextField
        label="Search posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        {canCreateOrEdit && (
          <Grid item xs={12} lg={5}>
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
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    label="Title"
                    fullWidth
                    required
                  />

                  <TextField
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    label="Slug"
                    fullWidth
                    required
                  />

                  <TextField
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    label="Content"
                    fullWidth
                    multiline
                    minRows={6}
                    required
                  />

                  <TextField
                    name="featured_image"
                    value={form.featured_image}
                    onChange={handleChange}
                    label="Featured Image URL"
                    fullWidth
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
                        <MenuItem key={category.category_id} value={category.category_id}>
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
        )}

        <Grid item xs={12} lg={canCreateOrEdit ? 7 : 12}>
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
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <TableRow key={post.post_id}>
                      <TableCell>{post.post_id}</TableCell>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.slug}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>
                        {post.status}
                      </TableCell>
                      <TableCell>{post.category_name || '-'}</TableCell>
                      <TableCell>
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            width={50}
                            height={50}
                            style={{ objectFit: 'cover', borderRadius: 6 }}
                          />
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {canDelete && (
                          <Button
                            color="error"
                            size="small"
                            variant="outlined"
                            onClick={() => handleDelete(post.post_id)}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>No posts found.</TableCell>
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