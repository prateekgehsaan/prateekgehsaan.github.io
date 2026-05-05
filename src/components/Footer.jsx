import React from 'react';
import { Container, Typography, Box, IconButton, Divider } from '@mui/material';
import profileData from '../data/profile.json';

// Simple Arrow Up SVG
const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box component="footer" className="bg-white pt-16 pb-8 border-t border-slate-100">
      <Container maxWidth="lg">
        <Box className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <Box>
            <Typography variant="h6" className="font-extrabold text-slate-900 mb-1">
              {profileData.profile.name}<span className="text-blue-600">.</span>
            </Typography>
            <Typography variant="body2" className="text-slate-500 font-medium">
              Built with precision using React & Tailwind.
            </Typography>
          </Box>

          <IconButton 
            onClick={scrollToTop}
            className="bg-slate-50 hover:bg-blue-600 hover:text-white transition-all p-4 border border-slate-200"
          >
            <ArrowUpIcon />
          </IconButton>
        </Box>

        <Divider className="mb-8 border-slate-100" />

        <Box className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="caption" className="text-slate-400 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </Typography>
          <Box className="flex gap-8">
            <a href="#about" className="text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-tighter transition-colors">About</a>
            <a href="#projects" className="text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-tighter transition-colors">Projects</a>
            <a href="#contact" className="text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-tighter transition-colors">Contact</a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;