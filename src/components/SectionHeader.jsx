import React from 'react';
import { Box, Typography } from '@mui/material';

const SectionHeader = ({ children, sx = {} }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2, 
      mb: 2,
      ...sx 
    }}>
      <Box sx={{ 
        width: 48, 
        height: 3, 
        bgcolor: '#573CDD', 
        borderRadius: 1 
      }} />
      <Typography 
        variant="h3" 
        sx={{ 
          fontSize: { xs: 28, md: 30 }, 
          fontWeight: 800, 
          color: '#171A1F' 
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default SectionHeader;