import React from 'react';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import profileData from '../data/profile.json';

// Diamond SVG Icon Component - exact recreation of CSS design
const DiamondIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="#FFFFFF">
    <polygon points="11,0 22,11 11,22 0,11" />
  </svg>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton component="a" href={`#${item.toLowerCase()}`}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2, px: 2 }}>
        <Button
          fullWidth
          variant="contained"
          href={profileData.profile.resumeUrl}
          sx={{ mt: 1 }}
        >
          Resume
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0, minHeight: 64 }}>
          {/* Logo Container - Purple Circle with White Diamond Icon */}
          <Box
            sx={{
              position: 'relative',
              width: 32,
              height: 32,
              backgroundColor: '#573CDD',
              borderRadius: '50%',
              mr: 2,
              flexShrink: 0
            }}
          >
            <DiamondIcon />
          </Box>

          {/* Name with Gradient */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mr: 4,
              flexGrow: 0
            }}
          >
            {profileData.profile.name}
          </Typography>

          {/* Rest remains same */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                component="a"
                href={`#${item.toLowerCase()}`}
                sx={{
                  color: 'slate.600',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    color: 'blue.600',
                    backgroundColor: 'transparent'
                  },
                  py: 1.5
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ ml: 2, display: { xs: 'none', md: 'block' } }}>
            <Button
              variant="contained"
              component="a"
              href={profileData.profile.resumeUrl}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5856eb 0%, #7c3aed 100%)',
                  boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)'
                }
              }}
            >
              Resume
            </Button>
          </Box>

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon sx={{ color: 'slate.600' }} />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)'
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;