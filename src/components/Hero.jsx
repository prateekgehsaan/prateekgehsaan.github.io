import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import profileData from '../data/profile.json';

const Hero = () => {
  const { profile } = profileData;
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 6, sm: 8, md: 14 },
        minHeight: { md: '80vh' },
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: 6, md: 10 }
      }}
    >
      {/* LEFT CONTENT */}
      <Box
        sx={{
          flex: 1,
          maxWidth: { md: 600 },
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        {/* Tag */}
        <Box
          sx={{
            display: 'inline-flex',
            px: 1.5,
            py: 0.75,
            mb: 3,
            borderRadius: '999px',
            bgcolor: 'rgba(87, 60, 221, 0.05)',
            border: '1px solid rgba(87, 60, 221, 0.2)',
            transition: '0.2s',
            '&:hover': {
              bgcolor: '#DEE1E6',
              color: '#565D6D'
            }
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: '#565D6D' }}
          >
            Available for new opportunities
          </Typography>
        </Box>

        {/* Heading */}
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: '36px',
              sm: '44px',
              md: '64px',
              lg: '72px'
            },
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#171A1F',
            mb: 2
          }}
        >
          Hello, I'm{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #573CDD, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {profile.name}
          </Box>
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            fontSize: { xs: 18, md: 22 },
            fontWeight: 500,
            color: '#565D6D',
            mb: 2
          }}
        >
          {profile.title}
        </Typography>

        {/* Bio */}
        <Typography
          sx={{
            fontSize: { xs: 15, md: 17 },
            lineHeight: 1.6,
            color: '#565D6D',
            mb: 5,
            maxWidth: 520,
            mx: { xs: 'auto', md: 0 }
          }}
        >
          {profile.bio}
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: { xs: 'center', md: 'flex-start' },
            flexWrap: 'wrap'
          }}
        >
          <Button
            href="#projects"
            variant="contained"
            sx={{
              px: 4,
              py: 1.3,
              borderRadius: '999px',
              fontSize: 15,
              fontWeight: 600,
              textTransform: 'none',
              bgcolor: '#573CDD',
              boxShadow: '0 6px 20px rgba(87,60,221,0.25)',
              '&:hover': {
                bgcolor: '#573CDD',
                opacity: 0.9
              }
            }}
          >
            View Projects
          </Button>

          <Button
            href="#contact"
            variant="outlined"
            sx={{
              px: 4,
              py: 1.3,
              borderRadius: '999px',
              fontSize: 15,
              fontWeight: 600,
              textTransform: 'none',
              borderColor: '#DEE1E6',
              color: '#171A1F',
              bgcolor: '#fff',
              '&:hover': {
                borderColor: '#573CDD',
                color: '#573CDD'
              }
            }}
          >
            Let's Talk
          </Button>
        </Box>
      </Box>

      {/* RIGHT IMAGE */}
      <Box
        sx={{
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          width: {
            xs: 200,
            sm: 240,
            md: 300,
            lg: 340
          },
          height: {
            xs: 200,
            sm: 240,
            md: 300,
            lg: 340
          }
        }}
      >
        {/* Glow */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            bgcolor: 'rgba(87,60,221,0.15)',
            filter: 'blur(60px)',
            zIndex: 0
          }}
        />

        {/* Avatar */}
        <Avatar
          src={
            profile.image ||
            'https://via.placeholder.com/400x400/FFE0DF/FFFFFF?text=PG'
          }
          alt={profile.name}
          sx={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            borderRadius: '50%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '4px solid white'
          }}
          imgProps={{
            style: {
              objectFit: 'cover'
            }
          }}
        />
      </Box>
    </Container>
  );
};

export default Hero;