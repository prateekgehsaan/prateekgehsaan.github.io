import React, { useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Chip, 
  Button,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import profileData from '../data/profile.json';
import SectionHeader from './SectionHeader';

const Projects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef(null);
  const projects = profileData.projects || [];

  const scrollHandler = (direction) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth * 0.8;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Container 
      id="projects"
      maxWidth={false} 
      sx={{ 
        maxWidth: '1440px',
        px: { xs: 3, sm: 4, md: 6, lg: 8 },
        py: { xs: 6, md: 10 }, 
        bgcolor: 'rgba(250, 250, 251, 0.5)',
        position: 'relative'
      }}
    >
      {/* Header */}
      <SectionHeader>Featured Projects</SectionHeader>

      <Typography sx={{ 
        fontSize: { xs: 14, sm: 15, md: 16 }, 
        color: '#565D6D', 
        mb: { xs: 5, md: 8 }, 
        fontWeight: 500,
        maxWidth: 600
      }}>
        A selection of my recent works across different technical domains.
      </Typography>

      {/* Slider Wrapper */}
      <Box sx={{ position: 'relative', width: '100%' }}>

        {/* Arrows Layer */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'space-between',
            pointerEvents: 'none',
            px: { xs: 1, sm: 2, md: 3 }
          }}
        >
          {/* LEFT */}
          <IconButton
            onClick={() => scrollHandler('left')}
            sx={{
              pointerEvents: 'auto',
              bgcolor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
              width: { xs: 44, md: 52 },
              height: { xs: 44, md: 52 },
              color: '#573CDD',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0 16px 40px rgba(87,60,221,0.3)'
              }
            }}
          >
            <ArrowLeftIcon />
          </IconButton>

          {/* RIGHT */}
          <IconButton
            onClick={() => scrollHandler('right')}
            sx={{
              pointerEvents: 'auto',
              bgcolor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
              width: { xs: 44, md: 52 },
              height: { xs: 44, md: 52 },
              color: '#573CDD',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0 16px 40px rgba(87,60,221,0.3)'
              }
            }}
          >
            <ArrowRightIcon />
          </IconButton>
        </Box>

        {/* Scroll Container */}
        <Box
          ref={containerRef}
          sx={{
            display: 'flex',
            gap: { xs: 3, md: 4.5 },
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },

            py: 2,
            px: { xs: 2, sm: 3, md: 4, lg: 6 }
          }}
        >
          {projects.map((project, index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 auto',
                width: { xs: 280, sm: 300, md: 340 },
                scrollSnapAlign: 'center',
                height: { xs: 360, sm: 380, md: 400 }
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 2.5,
                  border: '1px solid rgba(87, 60, 221, 0.15)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'white',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    boxShadow: '0 16px 48px rgba(87, 60, 221, 0.2)',
                    transform: 'translateY(-8px)',
                    borderColor: 'rgba(87, 60, 221, 0.3)'
                  }
                }}
              >
                {/* Image Mock */}
                <Box sx={{ 
                  height: { xs: 130, sm: 145, md: 160 },
                  bgcolor: 'rgba(250, 250, 251, 0.8)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    position: 'absolute', 
                    width: '115%', 
                    height: '115%', 
                    background: 'linear-gradient(135deg, rgba(87,60,221,0.08), rgba(139,92,246,0.08))',
                    transform: 'rotate(-1.5deg) translateX(-3%)'
                  }} />
                  <Typography sx={{ 
                    fontSize: { xs: 36, sm: 40, md: 44 }, 
                    fontWeight: 100, 
                    color: 'rgba(87, 60, 221, 0.22)', 
                    zIndex: 1 
                  }}>
                    {project.title?.[0]}
                  </Typography>
                </Box>

                <CardContent sx={{ 
                  p: { xs: 2.5, md: 3 }, 
                  flexGrow: 1, 
                  pt: 0,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Typography sx={{ 
                    fontSize: { xs: 16, md: 18 }, 
                    fontWeight: 700, 
                    color: '#171A1F', 
                    mb: 2
                  }}>
                    {project.title}
                  </Typography>

                  <Typography sx={{ 
                    fontSize: { xs: 13, md: 15 }, 
                    color: '#565D6D', 
                    mb: 3,
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {project.description}
                  </Typography>

                  <Box sx={{ mb: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.tech?.slice(0, 3).map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(87, 60, 221, 0.1)',
                          color: '#573CDD',
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 1.5
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    href={project.link}
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      borderColor: 'rgba(87, 60, 221, 0.35)',
                      color: '#573CDD',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#573CDD',
                        bgcolor: 'rgba(87, 60, 221, 0.06)'
                      }
                    }}
                  >
                    View Details →
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

      </Box>
    </Container>
  );
};

export default Projects;