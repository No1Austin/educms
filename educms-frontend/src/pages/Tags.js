import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
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

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTags = async () => {
    try {
      const response = await api.get('/tags');
      setTags(response.data.tags || []);
    } catch (err) {
      setError('Failed to load tags');
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/tags', form);
      setSuccess('Tag created successfully');
      setForm({ name: '', slug: '', description: '' });
      fetchTags();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create tag');
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Tags
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Create and manage labels for organizing educational content.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Add Tag
            </Typography>

            <form onSubmit={handleCreate}>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  minRows={3}
                />

                <Button type="submit" variant="contained">
                  Create Tag
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Tag List
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Slug</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <TableRow key={tag.tag_id}>
                      <TableCell>{tag.tag_id}</TableCell>
                      <TableCell>{tag.name}</TableCell>
                      <TableCell>{tag.slug}</TableCell>
                      <TableCell>{tag.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>No tags found.</TableCell>
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

export default Tags;