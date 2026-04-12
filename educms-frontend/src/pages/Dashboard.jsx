import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    posts: 0,
    categories: 0,
    tags: 0,
    comments: 0,
  });

  const [loading, setLoading] = useState(true);

  const canManageContent = ['admin', 'editor'].includes(user?.role);
  const canModerateComments = ['admin', 'editor'].includes(user?.role);
  const canManageMedia = ['admin', 'editor'].includes(user?.role);

  const fetchStats = async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.first_name || user?.username || 'User';

  const statCards = [
    { title: 'Total Posts', value: stats.posts, subtitle: 'Published and draft content' },
    { title: 'Categories', value: stats.categories, subtitle: 'Organized learning topics' },
    { title: 'Tags', value: stats.tags, subtitle: 'Search and grouping labels' },
    { title: 'Comments', value: stats.comments, subtitle: 'Community engagement' },
  ];

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 55%, #60a5fa 100%)',
          color: '#fff',
        }}
      >
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Welcome back, {displayName}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
          This is your EduCMS control center.
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {canManageContent && (
            <Button
              variant="contained"
              sx={{ bgcolor: '#fff', color: '#1d4ed8' }}
              onClick={() => navigate('/posts')}
            >
              Create New Post
            </Button>
          )}

          {canManageContent && (
            <Button
              variant="outlined"
              sx={{ borderColor: '#fff', color: '#fff' }}
              onClick={() => navigate('/categories')}
            >
              Manage Categories
            </Button>
          )}

          <Button
            variant="outlined"
            sx={{ borderColor: '#fff', color: '#fff' }}
            onClick={fetchStats}
          >
            Refresh
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((item) => (
          <Grid item xs={12} sm={6} lg={3} key={item.title}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
                border: '1px solid #eef2f7',
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                  {loading ? '...' : item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
            }}
          >
            <Typography variant="h6" fontWeight={800}>
              Quick Actions
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
              {canManageContent && (
                <Button variant="contained" onClick={() => navigate('/categories')}>
                  Add Category
                </Button>
              )}

              {canManageContent && (
                <Button variant="outlined" onClick={() => navigate('/tags')}>
                  Add Tag
                </Button>
              )}

              {canManageContent && (
                <Button variant="outlined" onClick={() => navigate('/posts')}>
                  Manage Posts
                </Button>
              )}

              {canModerateComments && (
                <Button variant="outlined" onClick={() => navigate('/comments')}>
                  Comments
                </Button>
              )}

              {canManageMedia && (
                <Button variant="outlined" onClick={() => navigate('/media')}>
                  Media
                </Button>
              )}
            </Stack>
          </Paper>
        </Grid>

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
              Account
            </Typography>

            <Stack spacing={1.5}>
              <Typography><strong>Name:</strong> {displayName}</Typography>
              <Typography><strong>Email:</strong> {user?.email || 'No email'}</Typography>
              <Typography sx={{ textTransform: 'capitalize' }}>
                <strong>Role:</strong> {user?.role || 'User'}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;