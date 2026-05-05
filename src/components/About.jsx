import React from 'react';
import { Box, Typography, Container, Paper, Avatar } from '@mui/material';
import profileData from '../data/profile.json';

// Icons
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#573CDD">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#573CDD">
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#573CDD">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#19191F">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.34.16-2h4.68c.09.66.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a7.987 7.987 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
  </svg>
);

const About = () => {
  const { profile } = profileData;

  return (
    <Container id="about" maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'rgba(250, 250, 251, 0.3)', position: 'relative' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 8, alignItems: 'flex-start' }}>
        {/* Left Content */}
        <Box sx={{ flex: 1, maxWidth: { lg: 800 } }}>
          {/* Blue Line + Heading */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
            <Box sx={{ width: 32, height: 2, bgcolor: '#573CDD' }} />
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: 28, md: 30 },
                fontWeight: 700,
                color: '#171A1F'
              }}
            >
              About Me
            </Typography>
          </Box>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: 1.5,
              color: '#565D6D',
              mb: 4
            }}
          >
            A brief introduction to my professional journey and philosophy.
          </Typography>

          {/* Main Content */}
          <Typography
            sx={{
              fontSize: { xs: 18, md: 20 },
              lineHeight: 1.65,
              color: '#565D6D',
              mb: 6,
              maxWidth: 800
            }}
          >
            I am a dedicated Full-stack engineer specializing in building scalable web applications. I focus on shipping clean, maintainable code with mentoring.
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
              lineHeight: 1.5,
              color: '#565D6D',
              maxWidth: 800
            }}
          >
            I believe that great software is built on the foundation of collaboration, empathy for end-users, and understanding of business needs.
          </Typography>
        </Box>

        {/* Right Cards */}
        <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 363 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Quick Facts Card */}
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: '0 0 2px rgba(23,26,31,0.08), 0 1px 2.5px rgba(23,26,31,0.06)'
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 4, fontSize: 18, fontWeight: 700 }}
            >
              Quick Facts
            </Typography>

            {/* Location */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(87, 60, 221, 0.1)' }}>
                <MapPinIcon />
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#565D6D', mb: 0.5 }}>
                  LOCATION
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {profile.location}
                </Typography>
              </Box>
            </Box>

            {/* Experience */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(87, 60, 221, 0.1)' }}>
                <BriefcaseIcon />
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#565D6D', mb: 0.5 }}>
                  EXPERIENCE
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {profile.experience}+ Years
                </Typography>
              </Box>
            </Box>

            {/* Email */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(87, 60, 221, 0.1)' }}>
                <MailIcon />
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#565D6D', mb: 0.5 }}>
                  EMAIL
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {profile.email}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Collaboration Card */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 2.5,
              bgcolor: '#F4F2FD'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'transparent' }}>
                <GlobeIcon />
              </Avatar>
              <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
                Open for Collaboration
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.4,
                color: 'rgba(25, 25, 31, 0.9)'
              }}
            >
              I'm currently interested in remote roles or consultant projects in the FinTech or Healthcare sectors.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default About;