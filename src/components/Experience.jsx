import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Chip, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails 
} from '@mui/material';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import profileData from '../data/profile.json';
import SectionHeader from './SectionHeader';

const Experience = () => {
  const experiences = profileData.experience || [];
  
  // State to handle which panel is open. Default is the first one (index 0).
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panelIndex) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelIndex : false);
  };

  return (
    <Container maxWidth="lg" id="experience" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
      {/* Header */}
      <SectionHeader>Work Experience</SectionHeader>

      <Typography sx={{ fontSize: 16, color: '#565D6D', mb: 8, fontWeight: 500 }}>
        My professional trajectory and the companies that shaped my career.
      </Typography>

      {/* Experience Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {experiences.map((exp, index) => (
          <Accordion 
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: expanded === index ? '#573CDD33' : '#F3F4F6',
              borderRadius: '24px !important',
              bgcolor: expanded === index ? '#F9FAFB' : 'white',
              '&:before': { display: 'none' }, // Remove default MUI line
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              '&:hover': {
                borderColor: '#573CDD66',
                boxShadow: '0 4px 20px rgba(87, 60, 221, 0.05)'
              }
            }}
          >
            {/* Header / Summary Card */}
            <AccordionSummary
              expandIcon={<ChevronDown size={24} style={{ color: '#573CDD' }} />}
              sx={{ 
                px: { xs: 3, md: 5 }, 
                py: 2,
                '& .MuiAccordionSummary-content': { margin: 0 }
              }}
            >
              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 800, color: '#171A1F' }}>
                    {exp.role}
                  </Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#573CDD' }}>
                    {exp.company}
                  </Typography>
                </Box>

                {/* Date & Location Badges */}
                <Box sx={{ display: 'flex', gap: 3, mr: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Calendar size={16} color="#565D6D" />
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#565D6D', textTransform: 'uppercase' }}>
                      {exp.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MapPin size={16} color="#565D6D" />
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#565D6D', textTransform: 'uppercase' }}>
                      Remote
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AccordionSummary>

            {/* Drop Panel Content */}
            <AccordionDetails sx={{ px: { xs: 3, md: 5 }, pb: 4, pt: 0 }}>
              <Box sx={{ borderTop: '1px solid #E5E7EB', pt: 3, mt: 1 }}>
                <Typography sx={{ fontSize: 16, color: '#4B5563', lineHeight: 1.7, mb: 4, fontStyle: 'italic' }}>
                  {exp.description}
                </Typography>

                {/* Responsibilities List */}
                <Box sx={{ mb: 4 }}>
                  {exp.responsibilities?.map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      <Box sx={{ 
                        minWidth: 28, 
                        height: 28, 
                        bgcolor: '#573CDD1A', 
                        borderRadius: '8px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#573CDD' }}>
                          {idx + 1}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: 16, color: '#374151', lineHeight: 1.6 }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Tech Stack Chips */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {exp.techStack?.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      sx={{
                        bgcolor: 'white',
                        color: '#573CDD',
                        border: '1px solid #573CDD33',
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: '8px',
                        '&:hover': { bgcolor: '#573CDD', color: 'white' },
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default Experience;