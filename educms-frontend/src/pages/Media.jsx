import { Paper, Typography } from '@mui/material';

const Media = () => {
  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Media
      </Typography>
      <Typography color="text.secondary">
        This page will manage uploaded files and media.
      </Typography>
    </Paper>
  );
};

export default Media;