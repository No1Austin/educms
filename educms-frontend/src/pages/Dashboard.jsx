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

const stats = [
  { title: 'Total Posts', value: '24', subtitle: 'Published and draft content' },
  { title: 'Categories', value: '8', subtitle: 'Organized learning topics' },
  { title: 'Tags', value: '15', subtitle: 'Search and grouping labels' },
  { title: 'Comments', value: '42', subtitle: 'Community engagement' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.first_name || user?.username || 'User';

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
        <Typography variant="body1" sx={{ maxWidth: 800, opacity: 0.95, mb: 3 }}>
          This is your EduCMS control center. From here you can manage educational
          content, structure topics, moderate user interactions, and keep your
          platform organized.
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: '#1d4ed8',
              fontWeight: 700,
              '&:hover': { bgcolor: '#eef2ff' },
            }}
            onClick={() => navigate('/posts')}
          >
            Create New Post
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: '#fff',
              color: '#fff',
              '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
            }}
            onClick={() => navigate('/categories')}
          >
            Manage Categories
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((item) => (
          <Grid xs={12} sm={6} lg={3} key={item.title}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
                border: '1px solid #eef2f7',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                  {item.value}
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
        <Grid xs={12} lg={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Use these shortcuts to keep building and managing your content quickly.
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button variant="contained" onClick={() => navigate('/categories')}>
                Add Category
              </Button>
              <Button variant="outlined" onClick={() => navigate('/tags')}>
                Add Tag
              </Button>
              <Button variant="outlined" onClick={() => navigate('/posts')}>
                Manage Posts
              </Button>
              <Button variant="outlined" onClick={() => navigate('/comments')}>
                Moderate Comments
              </Button>
              <Button variant="outlined" onClick={() => navigate('/media')}>
                Media Library
              </Button>
            </Stack>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              border: '1px solid #eef2f7',
            }}
          >
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This area can later show the latest posts, edits, comments, and uploads.
            </Typography>

            <Box sx={{ py: 1 }}>
              <Typography variant="body2">• New category added</Typography>
              <Typography variant="body2">• Post published successfully</Typography>
              <Typography variant="body2">• Comment awaiting moderation</Typography>
              <Typography variant="body2">• Media uploaded to library</Typography>
            </Box>
          </Paper>
        </Grid>

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
              Account Overview
            </Typography>

            <Box
              sx={{
                mt: 2,
                p: 2.5,
                borderRadius: 3,
                bgcolor: '#f8fafc',
                border: '1px solid #e5e7eb',
              }}
            >
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    {displayName}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    {user?.email || 'No email'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Role
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={700}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {user?.role || 'User'}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;