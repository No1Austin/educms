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

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    post_id: '',
    content: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await api.get('/comments');
      setComments(response.data.comments || []);
    } catch {
      setError('Failed to load comments');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts || []);
    } catch {}
  };

  useEffect(() => {
    fetchComments();
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/comments', {
        ...form,
        post_id: Number(form.post_id),
      });

      setSuccess('Comment created successfully');
      setForm({ post_id: '', content: '' });
      fetchComments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create comment');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/comments/${id}/approve`);
      fetchComments();
    } catch {
      setError('Failed to approve comment');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this comment?');
    if (!confirmed) return;

    try {
      await api.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.comment_id !== id));
    } catch {
      setError('Failed to delete comment');
    }
  };

  const filteredComments = comments.filter((c) =>
    c.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Comments
      </Typography>

      <TextField
        label="Search comments"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      />

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Grid container spacing={3}>
        <Grid xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Add Comment</Typography>

            <form onSubmit={handleCreate}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Post</InputLabel>
                  <Select
                    name="post_id"
                    value={form.post_id}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select post</MenuItem>
                    {posts.map((post) => (
                      <MenuItem key={post.post_id} value={post.post_id}>
                        {post.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  label="Comment"
                  fullWidth
                  multiline
                  minRows={4}
                />

                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        <Grid xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Comment List</Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Post</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredComments.map((c) => (
                  <TableRow key={c.comment_id}>
                    <TableCell>{c.comment_id}</TableCell>
                    <TableCell>{c.post_title}</TableCell>
                    <TableCell>{c.content}</TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {c.status !== 'approved' && (
                          <Button size="small" onClick={() => handleApprove(c.comment_id)}>
                            Approve
                          </Button>
                        )}
                        <Button color="error" size="small" onClick={() => handleDelete(c.comment_id)}>
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredComments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>No comments</TableCell>
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

export default Comments;