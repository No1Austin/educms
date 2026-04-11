import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import api from '../src/api/axios';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState({
    name: '',
    slug: '',
  });
  const [error, setError] = useState('');

  const fetchTags = async () => {
    try {
      const res = await api.get('/tags');
      setTags(res.data.tags || []);
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

    try {
      await api.post('/tags', form);
      setForm({ name: '', slug: '' });
      fetchTags();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create tag');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tags
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Create Tag */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Add Tag</Typography>

        <form onSubmit={handleCreate}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Create Tag
          </Button>
        </form>
      </Paper>

      {/* Tag List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Tag List</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.tag_id}>
                <TableCell>{tag.tag_id}</TableCell>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.slug}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Tags;