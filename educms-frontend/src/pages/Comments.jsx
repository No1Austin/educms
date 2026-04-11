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
    } catch (err) {
      console.error('Fetch comments error:', err);
      setError('Failed to load comments');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts || response.data.data || []);
    } catch (err) {
      console.error('Fetch posts error:', err);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ?? '',
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        ...form,
        post_id: Number(form.post_id),
      };

      const response = await api.post('/comments', payload);

      setSuccess(response.data.message || 'Comment created successfully');
      setForm({
        post_id: '',
        content: '',
      });
      await fetchComments();
    } catch (err) {
      console.error('Create comment error:', err);
      setError(err.response?.data?.message || 'Failed to create comment');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/comments/${id}/approve`);
      await fetchComments();
    } catch (err) {
      console.error('Approve comment error:', err);
      setError(err.response?.data?.message || 'Failed to approve comment');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/comments/${id}`);
      await fetchComments();
    } catch (err) {
      console.error('Delete comment error:', err);
      setError(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Comments
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Create, review, approve, and remove comments.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        <Grid xs={12} lg={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Add Comment
            </Typography>

            <form onSubmit={handleCreate}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Post</InputLabel>
                  <Select
                    name="post_id"
                    value={form.post_id ?? ''}
                    label="Post"
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select post</MenuItem>
                    {posts.map((post) => {
                      const postId = post.id ?? post.post_id;
                      return (
                        <MenuItem key={postId} value={postId}>
                          {post.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <TextField
                  label="Comment"
                  name="content"
                  value={form.content ?? ''}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  minRows={4}
                />

                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Comment'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        <Grid xs={12} lg={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Comment List
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Post</strong></TableCell>
                  <TableCell><strong>Content</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.length > 0 ? (
                  comments.map((comment) => {
                    const commentId = comment.id ?? comment.comment_id;
                    return (
                      <TableRow key={commentId}>
                        <TableCell>{commentId}</TableCell>
                        <TableCell>{comment.post_title || comment.post_id}</TableCell>
                        <TableCell>{comment.content}</TableCell>
                        <TableCell>{comment.status}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            {comment.status !== 'approved' && (
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleApprove(commentId)}
                              >
                                Approve
                              </Button>
                            )}
                            <Button
                              size="small"
                              color="error"
                              variant="outlined"
                              onClick={() => handleDelete(commentId)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No comments found.</TableCell>
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