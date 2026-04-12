import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import api from '../api/axios';

const Media = () => {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchMedia = async () => {
    try {
      const response = await api.get('/media');
      setMedia(response.data.media || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load media');
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(response.data.message || 'File uploaded successfully');
      setFile(null);
      await fetchMedia();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/media/${id}`);
      await fetchMedia();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Media
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Upload and manage files for your CMS.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3, borderRadius: 4, mb: 3 }}>
        <Stack spacing={2}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button variant="contained" onClick={handleUpload}>
            Upload File
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>
          Media Library
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Filename</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Size</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {media.length > 0 ? (
              media.map((item) => (
                <TableRow key={item.media_id}>
                  <TableCell>{item.media_id}</TableCell>
                  <TableCell>{item.original_name}</TableCell>
                  <TableCell>{item.mime_type}</TableCell>
                  <TableCell>{item.file_size}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      onClick={() => handleDelete(item.media_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No media found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Media;