import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Categories', path: '/categories' },
  { label: 'Tags', path: '/tags' },
  { label: 'Posts', path: '/posts' },
  { label: 'Comments', path: '/comments' },
  { label: 'Media', path: '/media' },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.first_name || user?.username || 'User';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fb' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#111827',
            color: '#fff',
            borderRight: 'none',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={800}>
            EduCMS
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
            Admin Panel
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        <List sx={{ px: 1.5, py: 2 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>

        <Box sx={{ mt: 'auto', p: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.06)',
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Logged in as
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {displayName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.7, textTransform: 'capitalize' }}
            >
              {user?.role}
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: '#ffffff',
            color: '#111827',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Content Management Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage courses, posts, categories, tags, media, and comments
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={600}>
                  {displayName}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {user?.role}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#2563eb' }}>
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;